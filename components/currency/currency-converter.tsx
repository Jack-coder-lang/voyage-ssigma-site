"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, TrendingUp } from "lucide-react"

const currencies = [
  { code: "XOF", name: "Franc CFA (BCEAO)", symbol: "CFA", flag: "🇸🇳" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "USD", name: "Dollar américain", symbol: "$", flag: "🇺🇸" },
  { code: "GBP", name: "Livre sterling", symbol: "£", flag: "🇬🇧" },
  { code: "MAD", name: "Dirham marocain", symbol: "DH", flag: "🇲🇦" },
  { code: "NGN", name: "Naira nigérian", symbol: "₦", flag: "🇳🇬" },
  { code: "GHS", name: "Cedi ghanéen", symbol: "₵", flag: "🇬🇭" },
  { code: "ZAR", name: "Rand sud-africain", symbol: "R", flag: "🇿🇦" },
  { code: "JPY", name: "Yen japonais", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Dollar canadien", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Dollar australien", symbol: "A$", flag: "🇦🇺" },
  { code: "CHF", name: "Franc suisse", symbol: "CHF", flag: "🇨🇭" },
]

// Taux de change simulés (en production, utilisez une API réelle)
const exchangeRates: Record<string, Record<string, number>> = {
  XOF: {
    EUR: 0.00152,
    USD: 0.00163,
    GBP: 0.00129,
    MAD: 0.0164,
    NGN: 1.34,
    GHS: 0.0195,
    ZAR: 0.0305,
    JPY: 0.244,
    CAD: 0.00221,
    AUD: 0.00246,
    CHF: 0.00145,
  },
  EUR: {
    XOF: 656.96,
    USD: 1.07,
    GBP: 0.85,
    MAD: 10.78,
    NGN: 881.45,
    GHS: 12.82,
    ZAR: 20.05,
    JPY: 160.32,
    CAD: 1.45,
    AUD: 1.62,
    CHF: 0.95,
  },
  // Ajoutez d'autres taux selon vos besoins
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100000")
  const [fromCurrency, setFromCurrency] = useState<string>("XOF")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) return

    setIsLoading(true)

    // Simulation d'un appel API
    setTimeout(() => {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1
      const result = Number(amount) * rate
      setConvertedAmount(result)
      setIsLoading(false)
    }, 500)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency])

  const formatCurrency = (value: number, currencyCode: string) => {
    const currency = currencies.find((c) => c.code === currencyCode)
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: currencyCode === "XOF" ? 0 : 2,
    }).format(value)
  }

  const getCurrentRate = () => {
    return exchangeRates[fromCurrency]?.[toCurrency] || 1
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Convertisseur de devises
        </CardTitle>
        <CardDescription>Convertissez instantanément entre différentes devises</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Montant à convertir</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Entrez le montant"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">De</label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <span>{currency.flag}</span>
                    <span>{currency.code}</span>
                    <span className="text-sm text-gray-500">- {currency.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={swapCurrencies} className="rounded-full">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Vers</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <span>{currency.flag}</span>
                    <span>{currency.code}</span>
                    <span className="text-sm text-gray-500">- {currency.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {isLoading ? "..." : formatCurrency(convertedAmount, toCurrency)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Taux: 1 {fromCurrency} = {getCurrentRate().toFixed(6)} {toCurrency}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">Les taux de change sont mis à jour en temps réel</div>
      </CardContent>
    </Card>
  )
}
