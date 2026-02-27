"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Settings,
  BookOpen,
  Save,
  Plus,
  Pencil,
  Bot,
  RefreshCcw,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"

const subsidyRules = [
  {
    id: 1,
    name: "DS49",
    description: "Fondo Solidario de Eleccion de Vivienda",
    minSavings: "15 UF",
    maxRSH: "40%",
    cutoffScore: 13484,
    maxUF: "800 UF",
    lastUpdate: "15/01/2026",
    source: "Resolucion Exenta 123/2026",
  },
  {
    id: 2,
    name: "DS1",
    description: "Sistema Integrado de Subsidio Habitacional",
    minSavings: "20 UF",
    maxRSH: "70%",
    cutoffScore: 13484,
    maxUF: "1.100 UF",
    lastUpdate: "20/01/2026",
    source: "Resolucion Exenta 456/2026",
  },
  {
    id: 3,
    name: "DS27",
    description: "Programa de Proteccion del Patrimonio Familiar",
    minSavings: "5 UF",
    maxRSH: "60%",
    cutoffScore: 11734,
    maxUF: "120 UF",
    lastUpdate: "10/02/2026",
    source: "Resolucion Exenta 789/2026",
  },
  {
    id: 4,
    name: "DS19",
    description: "Programa de Integracion Social y Territorial",
    minSavings: "50 UF",
    maxRSH: "90%",
    cutoffScore: 14557,
    maxUF: "1.400 UF",
    lastUpdate: "05/02/2026",
    source: "Resolucion Exenta 101/2026",
  },
]

const documentRules = [
  { name: "Dominio Vigente", maxAge: 90, unit: "dias", required: true },
  { name: "Certificado RSH", maxAge: 6, unit: "meses", required: true },
  { name: "Carnet de Identidad", maxAge: 0, unit: "vigente", required: true },
  { name: "Cartola de Ahorro", maxAge: 30, unit: "dias", required: true },
  { name: "Factibilidad Tecnica", maxAge: 12, unit: "meses", required: true },
  { name: "Informe Social", maxAge: 6, unit: "meses", required: false },
]

export function Configuracion() {
  const [editingRow, setEditingRow] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6">
      {/* Subsidy Library */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              <div>
                <CardTitle className="text-base">Biblioteca de Subsidios</CardTitle>
                <CardDescription>Parametros de referencia que utiliza la IA para validar</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCcw className="mr-1 size-3.5" />
                Sincronizar MINVU
              </Button>
              <Button size="sm">
                <Plus className="mr-1 size-3.5" />
                Agregar Subsidio
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Programa</TableHead>
                  <TableHead>Descripcion</TableHead>
                  <TableHead>Ahorro Min.</TableHead>
                  <TableHead>RSH Max.</TableHead>
                  <TableHead>Puntaje Corte</TableHead>
                  <TableHead>Tope UF</TableHead>
                  <TableHead>Ult. Actualizacion</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subsidyRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono font-bold">
                        {rule.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-48 text-sm text-muted-foreground">
                      {rule.description}
                    </TableCell>
                    <TableCell>
                      {editingRow === rule.id ? (
                        <Input defaultValue={rule.minSavings} className="h-8 w-20" />
                      ) : (
                        <span className="font-medium text-foreground">{rule.minSavings}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === rule.id ? (
                        <Input defaultValue={rule.maxRSH} className="h-8 w-16" />
                      ) : (
                        <span className="text-foreground">{rule.maxRSH}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === rule.id ? (
                        <Input defaultValue={String(rule.cutoffScore)} className="h-8 w-24" />
                      ) : (
                        <span className="font-mono text-foreground">{rule.cutoffScore.toLocaleString()}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">{rule.maxUF}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground">{rule.lastUpdate}</span>
                        <span className="text-[10px] text-muted-foreground">{rule.source}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingRow === rule.id ? (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => setEditingRow(null)}
                        >
                          <Save className="mr-1 size-3" />
                          Guardar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingRow(rule.id)}
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Document Validation Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="size-5 text-primary" />
            <div>
              <CardTitle className="text-base">Reglas de Validacion de Documentos</CardTitle>
              <CardDescription>
                Parametros que la IA utiliza para aprobar o rechazar documentos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Vigencia Maxima</TableHead>
                  <TableHead>Obligatorio</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentRules.map((rule) => (
                  <TableRow key={rule.name}>
                    <TableCell className="font-medium text-foreground">{rule.name}</TableCell>
                    <TableCell>
                      {rule.maxAge === 0 ? (
                        <span className="text-muted-foreground">Debe estar vigente</span>
                      ) : (
                        <span className="text-foreground">{rule.maxAge} {rule.unit}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rule.required ? "default" : "secondary"}>
                        {rule.required ? "Obligatorio" : "Opcional"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-success">
                        <Bot className="size-3" />
                        IA Configurada
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* AI Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="size-5 text-primary" />
            <div>
              <CardTitle className="text-base">Estado del Asistente IA</CardTitle>
              <CardDescription>Configuracion y estado de los modulos de inteligencia artificial</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { module: "OCR / Extraccion", status: "Activo", version: "v2.3" },
              { module: "Validacion Legal", status: "Activo", version: "v1.8" },
              { module: "Match de Subsidios", status: "Activo", version: "v1.5" },
              { module: "Redaccion Ejecutiva", status: "Activo", version: "v2.0" },
              { module: "Clasificacion Territorial", status: "Activo", version: "v1.2" },
              { module: "WhatsApp Cobranza", status: "Activo", version: "v1.1" },
            ].map((ai) => (
              <div key={ai.module} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">{ai.module}</span>
                  <span className="text-xs text-muted-foreground">{ai.version}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-success" />
                  <span className="text-xs text-success">{ai.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
