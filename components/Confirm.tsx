import {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
  
  interface ConfirmDialogProps {
    message: string
    onConfirm: () => void
    children: React.JSX.Element
  }
  
  export default function ConfirmDialog({ message, onConfirm, children }: ConfirmDialogProps) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-muted-foreground">
            {message}
          </div>
          <DialogFooter className="gap-2">
            <DialogTrigger asChild>
              <Button variant="outline">Annuler</Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button onClick={onConfirm}>Confirmer</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  