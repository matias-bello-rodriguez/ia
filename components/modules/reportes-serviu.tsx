"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  FolderArchive,
  Bot,
  CheckCircle2,
  Sparkles,
  RefreshCcw,
} from "lucide-react"
import { useState } from "react"

const carpetaFiles = [
  { name: "12345678-9_DOMINIO_2026.pdf", type: "Dominio Vigente", folio: 1, status: "ok" },
  { name: "12345678-9_RSH_2026.pdf", type: "Certificado RSH", folio: 2, status: "ok" },
  { name: "12345678-9_AHORRO_2026.pdf", type: "Cartola de Ahorro", folio: 3, status: "ok" },
  { name: "12345678-9_CI_2026.pdf", type: "Carnet de Identidad", folio: 4, status: "ok" },
  { name: "12345678-9_FACTIBILIDAD_2026.pdf", type: "Factibilidad Tecnica", folio: 5, status: "ok" },
  { name: "12345678-9_INDICE_FOLIADO.pdf", type: "Indice Foliado", folio: 0, status: "generated" },
]

export function ReportesServiu() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(true)

  const handleGenerate = () => {
    setIsGenerating(true)
    setReportGenerated(false)
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="report">
        <TabsList>
          <TabsTrigger value="report">
            <FileText className="size-3.5" />
            Resumen Ejecutivo
          </TabsTrigger>
          <TabsTrigger value="carpeta">
            <FolderArchive className="size-3.5" />
            Carpeta SERVIU
          </TabsTrigger>
        </TabsList>

        {/* Executive Report Tab */}
        <TabsContent value="report">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="size-5 text-primary" />
                    <CardTitle className="text-base">Informe Generado por IA</CardTitle>
                  </div>
                  <Button size="sm" variant="outline" onClick={handleGenerate} disabled={isGenerating}>
                    <RefreshCcw className={`mr-1 size-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                    {isGenerating ? "Generando..." : "Regenerar"}
                  </Button>
                </div>
                <CardDescription>Resumen ejecutivo para la Constructora</CardDescription>
              </CardHeader>
              <CardContent>
                {reportGenerated ? (
                  <div className="space-y-4 rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="size-3.5 text-primary" />
                      Generado automaticamente por IA - Ultimo: 27/02/2026
                    </div>
                    <Separator />
                    <div className="space-y-4 text-sm leading-relaxed text-foreground">
                      <p>
                        La beneficiaria Maria Gonzalez Soto, RUT 12.345.678-9, perteneciente al Comite
                        &quot;Villa Esperanza&quot; ubicado en Puente Alto, Region Metropolitana, cumple con el perfil
                        tecnico para el subsidio de techumbre bajo el programa DS49 del MINVU. Su tramo
                        en el Registro Social de Hogares corresponde al 40%, lo que la situa dentro del
                        rango elegible para este tipo de beneficio habitacional.
                      </p>
                      <p>
                        Respecto a la situacion financiera, la beneficiaria posee un ahorro bloqueado de
                        25 UF en su cartola, superando el minimo requerido de 15 UF para el programa
                        DS49. La factibilidad tecnica del proyecto ha sido evaluada positivamente por el
                        equipo de terreno, confirmando que la vivienda cumple con los estandares
                        constructivos necesarios para la intervencion.
                      </p>
                      <p>
                        La carpeta documental se encuentra al 100% de completitud, con todos los
                        documentos visados y aprobados por el sistema de validacion inteligente. El
                        Dominio Vigente, Certificado RSH, Cartola de Ahorro y Carnet de Identidad se
                        encuentran dentro de su periodo de vigencia. Se recomienda proceder con la
                        presentacion formal ante SERVIU para la adjudicacion del subsidio.
                      </p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary">DS49</Badge>
                        <Badge className="bg-success text-success-foreground">100% Completa</Badge>
                      </div>
                      <Button size="sm">
                        <Download className="mr-1 size-3.5" />
                        Exportar PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <span className="text-sm">Redactando informe ejecutivo...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Datos del Beneficiario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nombre</span>
                    <span className="font-medium text-foreground">Maria Gonzalez Soto</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">RUT</span>
                    <span className="font-mono text-foreground">12.345.678-9</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comite</span>
                    <span className="text-foreground">Villa Esperanza</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subsidio</span>
                    <Badge variant="secondary" className="font-mono">DS49</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ahorro</span>
                    <span className="font-medium text-success">25 UF</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">RSH</span>
                    <span className="text-foreground">40%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Completitud Carpeta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative flex size-24 items-center justify-center">
                      <svg className="size-24 -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--color-muted)"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--color-success)"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                      </svg>
                      <span className="absolute text-lg font-bold text-foreground">100%</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Lista para SERVIU</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* SERVIU Folder Tab */}
        <TabsContent value="carpeta">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">Generador de Carpeta SERVIU</CardTitle>
                  <CardDescription>
                    Archivos ordenados y renombrados segun estandar oficial
                  </CardDescription>
                </div>
                <Button>
                  <Download className="mr-2 size-4" />
                  Descargar .ZIP
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {carpetaFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded bg-muted text-xs font-bold text-muted-foreground">
                        {file.folio === 0 ? "IX" : `F${file.folio}`}
                      </div>
                      <div>
                        <p className="text-sm font-medium font-mono text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "generated" ? (
                        <Badge variant="secondary">
                          <Sparkles className="mr-1 size-3" />
                          Auto-generado
                        </Badge>
                      ) : (
                        <CheckCircle2 className="size-4 text-success" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
