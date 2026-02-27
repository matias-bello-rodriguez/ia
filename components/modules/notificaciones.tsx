"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MessageCircle,
  Send,
  Bot,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

const contacts = [
  {
    name: "Maria Gonzalez Soto",
    rut: "12.345.678-9",
    phone: "+56 9 1234 5678",
    missing: ["Carnet Identidad"],
    urgency: "critical" as const,
    lastContact: "Hace 3 dias",
    committee: "Villa Esperanza",
  },
  {
    name: "Pedro Ramirez Lagos",
    rut: "11.222.333-4",
    phone: "+56 9 8765 4321",
    missing: ["Certificado RSH"],
    urgency: "warning" as const,
    lastContact: "Hace 1 semana",
    committee: "Poblacion Aurora",
  },
  {
    name: "Ana Muhoz Vera",
    rut: "15.678.901-2",
    phone: "+56 9 5555 1234",
    missing: ["Dominio Vigente", "Cartola Ahorro"],
    urgency: "critical" as const,
    lastContact: "Nunca contactado",
    committee: "Comite Los Aromos",
  },
  {
    name: "Luisa Torres Pino",
    rut: "14.567.890-K",
    phone: "+56 9 4444 5678",
    missing: ["Dominio Vigente"],
    urgency: "warning" as const,
    lastContact: "Hace 2 dias",
    committee: "Poblacion Aurora",
  },
]

function generateMessage(contact: typeof contacts[0]) {
  const docList = contact.missing.join(" y ")
  return `Hola ${contact.name.split(" ")[0]}, para no perder su subsidio de vivienda, necesitamos que nos envie una foto de su ${docList} vigente lo antes posible. Puede responder a este mensaje con la foto o acercarse a nuestra oficina. Cualquier duda estamos para ayudarle.`
}

export function Notificaciones() {
  const [selectedContact, setSelectedContact] = useState(0)
  const [sentMessages, setSentMessages] = useState<Set<number>>(new Set())

  const handleSend = (index: number) => {
    setSentMessages((prev) => new Set(prev).add(index))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Contacts List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contactos Pendientes</CardTitle>
            <CardDescription>Beneficiarios con documentos faltantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            {contacts.map((contact, i) => (
              <button
                key={contact.rut}
                onClick={() => setSelectedContact(i)}
                className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                  selectedContact === i
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50 border border-transparent"
                }`}
              >
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User className="size-4 text-muted-foreground" />
                  <div
                    className={`absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${
                      contact.urgency === "critical" ? "bg-destructive" : "bg-warning"
                    }`}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">{contact.name}</span>
                  <span className="text-xs text-muted-foreground">{contact.committee}</span>
                  <div className="flex flex-wrap gap-1">
                    {contact.missing.map((doc) => (
                      <Badge key={doc} variant="outline" className="text-[10px] px-1.5 py-0">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="size-2.5" />
                    {contact.lastContact}
                  </div>
                </div>
                {sentMessages.has(i) && (
                  <CheckCircle2 className="ml-auto size-4 shrink-0 text-success" />
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Message Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="size-5 text-success" />
                <CardTitle className="text-base">Mensaje WhatsApp</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                <Bot className="mr-1 size-3" />
                Redactado por IA
              </Badge>
            </div>
            <CardDescription>
              Mensaje automatico para {contacts[selectedContact].name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
                    <MessageCircle className="size-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{contacts[selectedContact].name}</p>
                    <p className="text-xs text-muted-foreground">{contacts[selectedContact].phone}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    contacts[selectedContact].urgency === "critical"
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-warning/10 text-warning-foreground border-warning/20"
                  }
                >
                  {contacts[selectedContact].urgency === "critical" ? (
                    <>
                      <AlertCircle className="mr-1 size-3" />
                      Urgente
                    </>
                  ) : (
                    <>
                      <Clock className="mr-1 size-3" />
                      Pendiente
                    </>
                  )}
                </Badge>
              </div>

              {/* Message Bubble */}
              <div className="rounded-lg bg-success/5 border border-success/10 p-4">
                <div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
                  <Sparkles className="size-3 text-primary" />
                  Mensaje generado por IA
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {generateMessage(contacts[selectedContact])}
                </p>
              </div>

              {/* Documents Needed */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Documentos solicitados:</h4>
                <div className="flex flex-wrap gap-2">
                  {contacts[selectedContact].missing.map((doc) => (
                    <Badge key={doc} variant="destructive" className="text-xs">
                      <AlertCircle className="mr-1 size-3" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {sentMessages.has(selectedContact)
                    ? "Mensaje enviado exitosamente"
                    : "Listo para enviar por WhatsApp"}
                </span>
                <Button
                  onClick={() => handleSend(selectedContact)}
                  disabled={sentMessages.has(selectedContact)}
                  className={sentMessages.has(selectedContact) ? "bg-success text-success-foreground" : ""}
                >
                  {sentMessages.has(selectedContact) ? (
                    <>
                      <CheckCircle2 className="mr-2 size-4" />
                      Enviado
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      Enviar Recordatorio IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
