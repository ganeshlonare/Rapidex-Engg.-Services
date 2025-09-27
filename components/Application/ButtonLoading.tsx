import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

type ButtonLoadingProps = React.ComponentPropsWithoutRef<typeof Button> & {
    type?: "button" | "submit" | "reset"
    text: string
    loading?: boolean
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonLoading = ({ type = "button", text, loading = false, className, onClick, ...props }: ButtonLoadingProps) => {
    return (
        <Button
            type={type}
            disabled={loading}
            onClick={onClick}
            className={cn("", className)}
            {...props} >
            {loading &&
                <Loader2 className="animate-spin" />
            }
            {text}
        </Button>
    )
}

export default ButtonLoading