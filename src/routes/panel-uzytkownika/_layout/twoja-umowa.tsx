import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { Download, FileText } from 'lucide-react'
import type { JSX } from 'react'

export const Route = createFileRoute('/panel-uzytkownika/_layout/twoja-umowa')({
  component: TwojaUmowa,
})

export default function TwojaUmowa(): JSX.Element {
  const handleDownload = (): void => {
    // In a real application, this would trigger a file download
    // For this example, we'll create a dummy text file and download it
    const content =
      'To jest przykładowa umowa sprzedawcy. W rzeczywistej aplikacji byłby to dokument PDF lub DOC.'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'umowa-sprzedawcy.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Twoja umowa</h1>
      <p className="text-muted-foreground mb-8">
        Tutaj możesz pobrać swoją umowę sprzedawcy.
      </p>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Umowa sprzedawcy</CardTitle>
            <CardDescription>
              Pobierz aktualną wersję umowy sprzedawcy.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <div className="flex flex-col items-center">
              <FileText className="h-24 w-24 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                umowa-sprzedawcy.pdf
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ostatnia aktualizacja: 01.05.2024
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Pobierz umowę
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
