"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ScanSearch,
  Bot,
  Sparkles,
  Eye,
} from "lucide-react"
import { useState } from "react"

type ValidationStatus = "approved" | "rejected" | "alert" | null

interface ExtractedField {
  label: string
  value: string
  status: ValidationStatus
  note?: string
}

const mockExtractionResults: ExtractedField[] = [
  { label: "RUT", value: "12.345.678-9", status: "approved" },
  { label: "Nombre Completo", value: "Maria Gonzalez Soto", status: "approved" },
  { label: "Fecha Emision", value: "15/01/2026", status: "approved" },
  { label: "Vigencia", value: "15/04/2026", status: "approved" },
  {
    label: "Dominio Vigente",
    value: "Emitido hace 95 dias",
    status: "rejected",
    note: "Documento > 90 dias, solicitar actualizacion en el CBR",
  },
  { label: "Monto Ahorro", value: "12 UF", status: "alert", note: "Ahorro insuficiente - minimo requerido: 15 UF" },
]

const documentQueue = [
  { name: "12345678-9_DOMINIO_2026.pdf", type: "Dominio Vigente", status: "rejected" as const },
  { name: "12345678-9_RSH_2026.pdf", type: "Certificado RSH", status: "approved" as const },
  { name: "12345678-9_AHORRO_2026.pdf", type: "Cartola Ahorro", status: "alert" as const },
  { name: "12345678-9_CI_2026.pdf", type: "Carnet Identidad", status: "approved" as const },
  { name: "11222333-4_DOMINIO_2026.pdf", type: "Dominio Vigente", status: "approved" as const },
]

function StatusIcon({ status }: { status: ValidationStatus }) {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="size-4 text-success" />
    case "rejected":
      return <XCircle className="size-4 text-destructive" />
    case "alert":
      return <AlertCircle className="size-4 text-warning" />
    default:
      return null
  }
}

function StatusBadge({ status }: { status: "approved" | "rejected" | "alert" }) {
  const config = {
    approved: { label: "Aprobado", className: "bg-success/10 text-success border-success/20" },
    rejected: { label: "Rechazado", className: "bg-destructive/10 text-destructive border-destructive/20" },
    alert: { label: "Alerta", className: "bg-warning/10 text-warning-foreground border-warning/20" },
  }

  const c = config[status]

  return (
    <Badge variant="outline" className={c.className}>
      <StatusIcon status={status} />
      {c.label}
    </Badge>
  )
}

export function VisadoInteligente() {
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(true)

  const handleScan = () => {
    setIsScanning(true)
    setShowResults(false)
    setTimeout(() => {
      setIsScanning(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Document Upload */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Carga de Documentos</CardTitle>
              <CardDescription>Arrastra PDFs o imagenes para escanear con OCR</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="flex h-52 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 transition-colors hover:border-primary/50 hover:bg-primary/10"
                onClick={handleScan}
                role="button"
                tabIndex={0}
                aria-label="Zona de carga de documentos"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleScan()
                }}
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="size-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {isScanning ? "Escaneando documento..." : "Drag & Drop o haz clic para subir"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG - Max 10MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Previsualizacion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-center justify-center rounded-lg bg-muted/50">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Eye className="size-8" />
                  <span className="text-sm">Vista previa del documento</span>
                  <span className="text-xs">12345678-9_DOMINIO_2026.pdf</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Results */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="size-5 text-primary" />
                  <CardTitle className="text-base">Resultados de Extraccion IA</CardTitle>
                </div>
                <Button size="sm" variant="outline" onClick={handleScan} disabled={isScanning}>
                  <ScanSearch className="mr-1 size-3.5" />
                  {isScanning ? "Procesando..." : "Visar con IA"}
                </Button>
              </div>
              <CardDescription>Campos extraidos automaticamente por OCR</CardDescription>
            </CardHeader>
            <CardContent>
              {showResults ? (
                <div className="space-y-3">
                  {mockExtractionResults.map((field) => (
                    <div key={field.label} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-muted-foreground">{field.label}</span>
                          <span className="text-sm font-medium text-foreground">{field.value}</span>
                        </div>
                        <StatusIcon status={field.status} />
                      </div>
                      {field.note && (
                        <div
                          className={`mt-2 rounded-md px-3 py-2 text-xs ${
                            field.status === "rejected"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-warning/10 text-warning-foreground"
                          }`}
                        >
                          <Sparkles className="mr-1 inline size-3" />
                          {field.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span className="text-sm">Analizando documento con IA...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Validation Summary */}
          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumen de Validacion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-success/10 p-3">
                    <CheckCircle2 className="size-5 text-success" />
                    <span className="text-lg font-bold text-success">3</span>
                    <span className="text-xs text-muted-foreground">Aprobados</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-destructive/10 p-3">
                    <XCircle className="size-5 text-destructive" />
                    <span className="text-lg font-bold text-destructive">1</span>
                    <span className="text-xs text-muted-foreground">Rechazados</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-warning/10 p-3">
                    <AlertCircle className="size-5 text-warning" />
                    <span className="text-lg font-bold text-warning-foreground">1</span>
                    <span className="text-xs text-muted-foreground">Alertas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Document Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cola de Documentos Visados</CardTitle>
          <CardDescription>Historial de documentos procesados por la IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documentQueue.map((doc, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground font-mono">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
