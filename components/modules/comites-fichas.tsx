"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Search, Bot, Sparkles } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: 1,
    name: "Villa Esperanza",
    location: "Puente Alto, RM",
    type: "Radicacion",
    classification: "Campamento",
    beneficiaries: 45,
    progress: 72,
    status: "active",
  },
  {
    id: 2,
    name: "Poblacion Aurora",
    location: "La Pintana, RM",
    type: "Mejoramiento",
    classification: "Vivienda Consolidada",
    beneficiaries: 32,
    progress: 45,
    status: "active",
  },
  {
    id: 3,
    name: "Comite Los Aromos",
    location: "Cerro Navia, RM",
    type: "Radicacion",
    classification: "Campamento",
    beneficiaries: 28,
    progress: 90,
    status: "active",
  },
  {
    id: 4,
    name: "Condominio Social Sol",
    location: "San Bernardo, RM",
    type: "Mejoramiento",
    classification: "Vivienda Consolidada",
    beneficiaries: 60,
    progress: 15,
    status: "pending",
  },
]

const beneficiaries = [
  {
    name: "Maria Gonzalez Soto",
    rut: "12.345.678-9",
    rsh: "40%",
    savings: "25 UF",
    minSavings: "15 UF",
    suggestedSubsidy: "DS49",
    matchScore: 92,
    status: "approved",
    committee: "Villa Esperanza",
  },
  {
    name: "Pedro Ramirez Lagos",
    rut: "11.222.333-4",
    rsh: "50%",
    savings: "30 UF",
    minSavings: "20 UF",
    suggestedSubsidy: "DS1",
    matchScore: 85,
    status: "pending",
    committee: "Poblacion Aurora",
  },
  {
    name: "Ana Muhoz Vera",
    rut: "15.678.901-2",
    rsh: "35%",
    savings: "10 UF",
    minSavings: "15 UF",
    suggestedSubsidy: "DS49",
    matchScore: 67,
    status: "alert",
    committee: "Comite Los Aromos",
  },
  {
    name: "Carlos Diaz Fuentes",
    rut: "9.876.543-1",
    rsh: "60%",
    savings: "50 UF",
    minSavings: "30 UF",
    suggestedSubsidy: "DS1",
    matchScore: 95,
    status: "approved",
    committee: "Villa Esperanza",
  },
  {
    name: "Luisa Torres Pino",
    rut: "14.567.890-K",
    rsh: "45%",
    savings: "12 UF",
    minSavings: "15 UF",
    suggestedSubsidy: "DS49",
    matchScore: 58,
    status: "alert",
    committee: "Poblacion Aurora",
  },
  {
    name: "Roberto Vega Marin",
    rut: "16.789.012-3",
    rsh: "30%",
    savings: "20 UF",
    minSavings: "15 UF",
    suggestedSubsidy: "DS49",
    matchScore: 88,
    status: "approved",
    committee: "Comite Los Aromos",
  },
]

export function ComitesFichas() {
  const [search, setSearch] = useState("")
  const filteredBeneficiaries = beneficiaries.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.rut.includes(search) ||
      b.committee.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">
            <MapPin className="size-3.5" />
            Proyectos
          </TabsTrigger>
          <TabsTrigger value="beneficiaries">
            <Users className="size-3.5" />
            Beneficiarios
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Map Placeholder */}
            <Card className="lg:row-span-2">
              <CardHeader>
                <CardTitle className="text-base">Geolocalizacion de Proyectos</CardTitle>
                <CardDescription>Mapa interactivo de ubicaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <MapPin className="size-8" />
                    <span className="text-sm font-medium">Mapa Interactivo</span>
                    <span className="text-xs">Region Metropolitana, Chile</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {projects.map((p) => (
                        <Badge key={p.id} variant="outline" className="text-xs">
                          <MapPin className="mr-1 size-3" />
                          {p.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Cards */}
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <CardDescription className="mt-1">{project.location}</CardDescription>
                    </div>
                    <Badge
                      className={
                        project.classification === "Campamento"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-success/10 text-success border-success/20"
                      }
                      variant="outline"
                    >
                      <Sparkles className="mr-1 size-3" />
                      {project.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Clasificacion IA:</span>
                      <Badge variant="secondary">{project.classification}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Beneficiarios:</span>
                      <span className="font-medium text-foreground">{project.beneficiaries}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avance General:</span>
                        <span className="font-medium text-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Beneficiaries Tab */}
        <TabsContent value="beneficiaries">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">Panel de Beneficiarios</CardTitle>
                  <CardDescription>Clasificacion y match de subsidios por IA</CardDescription>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, RUT o comite..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beneficiario</TableHead>
                      <TableHead>RUT</TableHead>
                      <TableHead>Comite</TableHead>
                      <TableHead>RSH</TableHead>
                      <TableHead>Ahorro</TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Bot className="size-3.5" />
                          Match IA
                        </div>
                      </TableHead>
                      <TableHead>Subsidio Sugerido</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBeneficiaries.map((b) => (
                      <TableRow key={b.rut}>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell className="font-mono text-xs">{b.rut}</TableCell>
                        <TableCell className="text-muted-foreground">{b.committee}</TableCell>
                        <TableCell>{b.rsh}</TableCell>
                        <TableCell>
                          <span className={parseInt(b.savings) < parseInt(b.minSavings) ? "text-destructive" : "text-success"}>
                            {b.savings}
                          </span>
                          <span className="text-xs text-muted-foreground"> / {b.minSavings}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${
                                  b.matchScore >= 80
                                    ? "bg-success"
                                    : b.matchScore >= 60
                                    ? "bg-warning"
                                    : "bg-destructive"
                                }`}
                                style={{ width: `${b.matchScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{b.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-mono">
                            {b.suggestedSubsidy}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={b.status === "approved" ? "default" : b.status === "alert" ? "destructive" : "secondary"}
                            className={
                              b.status === "approved"
                                ? "bg-success text-success-foreground"
                                : b.status === "alert"
                                ? ""
                                : ""
                            }
                          >
                            {b.status === "approved" ? "Aprobado" : b.status === "alert" ? "Alerta" : "Pendiente"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
