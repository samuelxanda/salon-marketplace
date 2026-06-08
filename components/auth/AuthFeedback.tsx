import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthAlertProps = {
  success?: string;
  error?: string;
};

export function AuthAlert({ success, error }: AuthAlertProps) {
  if (!success && !error) return null;

  return (
    <div
      className={cn(
        "p-4 rounded-lg flex items-start gap-3 text-sm font-medium mb-6",
        success 
          ? "bg-green-50 text-green-700 border border-green-200" 
          : "bg-red-50 text-red-700 border border-red-200"
      )}
    >
      {success ? (
        <CheckCircle2 className="w-5 h-5 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 shrink-0" />
      )}
      <p>{success || error}</p>
    </div>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-red-600 mt-1.5 ml-0.5">{message}</p>;
}
