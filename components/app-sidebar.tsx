"use client"

import {
  LayoutDashboard,
  MapPin,
  ScanSearch,
  FileText,
  MessageCircle,
  Settings,
  Building2,
  Bot,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const modules = [
  {
    label: "Control",
    items: [
      { title: "Dashboard Global", icon: LayoutDashboard, id: "dashboard" },
    ],
  },
  {
    label: "Operativo",
    items: [
      { title: "Comites y Fichas", icon: MapPin, id: "comites" },
    ],
  },
  {
    label: "Visado IA",
    items: [
      { title: "Visado Inteligente", icon: ScanSearch, id: "visado" },
    ],
  },
  {
    label: "Cierre",
    items: [
      { title: "Reportes y SERVIU", icon: FileText, id: "reportes" },
    ],
  },
  {
    label: "Comunicacion",
    items: [
      { title: "Notificaciones", icon: MessageCircle, id: "notificaciones" },
    ],
  },
  {
    label: "Sistema",
    items: [
      { title: "Configuracion", icon: Settings, id: "configuracion" },
    ],
  },
]

interface AppSidebarProps {
  activeModule: string
  onModuleChange: (id: string) => void
}

export function AppSidebar({ activeModule, onModuleChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-accent">
            <Building2 className="size-5 text-sidebar-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">EGIS Pro</span>
            <span className="text-xs text-sidebar-foreground/60">Gestion Habitacional</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {modules.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-[10px] tracking-wider font-semibold">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeModule === item.id}
                      onClick={() => onModuleChange(item.id)}
                      tooltip={item.title}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent">
            <Bot className="size-4 text-sidebar-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-sidebar-foreground">Asistente IA</span>
            <span className="text-[10px] text-sidebar-foreground/50">Activo</span>
          </div>
          <div className="ml-auto size-2 rounded-full bg-success" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
