"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  FolderCheck,
  HardHat,
  AlertTriangle,
  Clock,
  FileWarning,
  TrendingUp,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const metrics = [
  {
    title: "Total UF en Proceso",
    value: "12.450",
    subtitle: "UF activas en subsidios",
    icon: DollarSign,
    trend: "+5.2% vs mes anterior",
  },
  {
    title: "Carpetas 100% Listas",
    value: "34",
    subtitle: "Listas para SERVIU",
    icon: FolderCheck,
    trend: "8 nuevas esta semana",
  },
  {
    title: "Proyectos en Construccion",
    value: "12",
    subtitle: "En ejecucion activa",
    icon: HardHat,
    trend: "3 por iniciar",
  },
  {
    title: "Alertas Criticas",
    value: "7",
    subtitle: "Requieren atencion",
    icon: AlertTriangle,
    trend: "2 documentos por vencer hoy",
  },
]

const barData = [
  { name: "Pendiente", value: 23, fill: "var(--color-warning)" },
  { name: "En Proceso", value: 45, fill: "var(--color-primary)" },
  { name: "Visado", value: 34, fill: "var(--color-chart-2)" },
  { name: "Listo SERVIU", value: 34, fill: "var(--color-success)" },
  { name: "Rechazado", value: 8, fill: "var(--color-destructive)" },
]

const pieData = [
  { name: "DS49", value: 45 },
  { name: "DS1", value: 30 },
  { name: "DS27", value: 15 },
  { name: "Otros", value: 10 },
]

const PIE_COLORS = [
  "var(--color-primary)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
]

const alerts = [
  {
    beneficiary: "Maria Gonzalez Soto",
    rut: "12.345.678-9",
    document: "Dominio Vigente",
    daysLeft: 3,
    committee: "Villa Esperanza",
    severity: "critical" as const,
  },
  {
    beneficiary: "Pedro Ramirez Lagos",
    rut: "11.222.333-4",
    document: "Certificado RSH",
    daysLeft: 7,
    committee: "Poblacion Aurora",
    severity: "warning" as const,
  },
  {
    beneficiary: "Ana Muhoz Vera",
    rut: "15.678.901-2",
    document: "Carnet de Identidad",
    daysLeft: 5,
    committee: "Comite Los Aromos",
    severity: "critical" as const,
  },
  {
    beneficiary: "Carlos Diaz Fuentes",
    rut: "9.876.543-1",
    document: "Certificado de Ahorro",
    daysLeft: 12,
    committee: "Villa Esperanza",
    severity: "warning" as const,
  },
  {
    beneficiary: "Luisa Torres Pino",
    rut: "14.567.890-K",
    document: "Dominio Vigente",
    daysLeft: 2,
    committee: "Poblacion Aurora",
    severity: "critical" as const,
  },
]

export function DashboardGlobal() {
  return (
    <div className="flex flex-col gap-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-sm font-medium">{metric.title}</CardDescription>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <metric.icon className="size-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{metric.subtitle}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-success">
                <TrendingUp className="size-3" />
                {metric.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Estado de Carpetas</CardTitle>
            <CardDescription>Distribucion por estado de avance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subsidios Activos</CardTitle>
            <CardDescription>Distribucion por programa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-warning" />
            <CardTitle className="text-base">Alertas de Prioridad IA</CardTitle>
          </div>
          <CardDescription>
            {'Documentos que vencen en < 15 dias detectados automaticamente'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.rut + alert.document}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">{alert.beneficiary}</span>
                    <Badge
                      variant={alert.severity === "critical" ? "destructive" : "secondary"}
                      className={alert.severity === "warning" ? "bg-warning text-warning-foreground" : ""}
                    >
                      {alert.severity === "critical" ? "Critico" : "Alerta"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{alert.rut}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <span className="text-foreground">{alert.document}</span>
                  <span className="text-xs text-muted-foreground">{alert.committee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-muted-foreground" />
                  <span className={`text-sm font-medium ${alert.daysLeft <= 5 ? "text-destructive" : "text-warning-foreground"}`}>
                    {alert.daysLeft} dias
                  </span>
                  <FileWarning className="size-3.5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
