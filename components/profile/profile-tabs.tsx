"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/profile/personal-info-form"
import { TravelPreferencesForm } from "@/components/profile/travel-preferences-form"
import { PaymentMethodsForm } from "@/components/profile/payment-methods-form"
import { SecuritySettingsForm } from "@/components/profile/security-settings-form"
import { CommunicationPreferencesForm } from "@/components/profile/communication-preferences-form"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
        <TabsTrigger value="personal">Informations</TabsTrigger>
        <TabsTrigger value="travel">Préférences</TabsTrigger>
        <TabsTrigger value="payment">Paiement</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="communication">Communication</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="space-y-4">
        <PersonalInfoForm />
      </TabsContent>
      <TabsContent value="travel" className="space-y-4">
        <TravelPreferencesForm />
      </TabsContent>
      <TabsContent value="payment" className="space-y-4">
        <PaymentMethodsForm />
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <SecuritySettingsForm />
      </TabsContent>
      <TabsContent value="communication" className="space-y-4">
        <CommunicationPreferencesForm />
      </TabsContent>
    </Tabs>
  )
}
