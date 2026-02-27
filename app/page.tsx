"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardGlobal } from "@/components/modules/dashboard-global"
import { ComitesFichas } from "@/components/modules/comites-fichas"
import { VisadoInteligente } from "@/components/modules/visado-inteligente"
import { ReportesServiu } from "@/components/modules/reportes-serviu"
import { Notificaciones } from "@/components/modules/notificaciones"
import { Configuracion } from "@/components/modules/configuracion"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles } from "lucide-react"

const moduleTitles: Record<string, { title: string; description: string }> = {
  dashboard: { title: "Dashboard Global", description: "Vision general del estado de la EGIS" },
  comites: { title: "Comites y Fichas Tecnicas", description: "Gestion de proyectos y beneficiarios" },
  visado: { title: "Visado Inteligente OCR", description: "Validacion de documentos con IA" },
  reportes: { title: "Reportes y Carpeta SERVIU", description: "Generacion de informes y exportacion" },
  notificaciones: { title: "Centro de Notificaciones", description: "Comunicacion con beneficiarios" },
  configuracion: { title: "Configuracion del Sistema", description: "Parametros y reglas de la IA" },
}

function ModuleContent({ activeModule }: { activeModule: string }) {
  switch (activeModule) {
    case "dashboard":
      return <DashboardGlobal />
    case "comites":
      return <ComitesFichas />
    case "visado":
      return <VisadoInteligente />
    case "reportes":
      return <ReportesServiu />
    case "notificaciones":
      return <Notificaciones />
    case "configuracion":
      return <Configuracion />
    default:
      return <DashboardGlobal />
  }
}

export default function Page() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const { title, description } = moduleTitles[activeModule] || moduleTitles.dashboard

  return (
    <SidebarProvider>
      <AppSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">{title}</h1>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Badge variant="outline" className="hidden gap-1.5 sm:flex">
              <Bot className="size-3 text-primary" />
              <span className="text-xs">IA Activa</span>
              <Sparkles className="size-3 text-primary" />
            </Badge>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <ModuleContent activeModule={activeModule} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
