'use client';

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface ButtonSaveProps {
  // Define quais campos devem ser incluídos na URL
  urlFields?: string[];
  // Base path para a URL (opcional)
  basePath?: string;
  // Texto do botão
  text?: string;
  // Texto do botão durante loading
  loadingText?: string;
  // Callback opcional após submissão
  onSubmitSuccess?: (formData: FormData) => void;
  // Variant do botão do shadcn/ui
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  // Se true, remove campos vazios da URL
  removeEmptyFields?: boolean;
}

export default function ButtonSave2({
  urlFields,
  basePath = "/",
  text = "Enviar",
  loadingText = "Enviando...",
  onSubmitSuccess,
  variant = "secondary",
  removeEmptyFields = true,
}: ButtonSaveProps) {
  const { pending } = useFormStatus();
  const router = useRouter();

  const buildQueryString = (formData: FormData): string => {
    const params = new URLSearchParams();
    
    // Se urlFields não for fornecido, usa todos os campos do form
    const fields = urlFields || Array.from(formData.keys());
    
    fields.forEach(field => {
      const value = formData.get(field);
      
      // Adiciona o campo na URL apenas se tiver valor ou se removeEmptyFields for false
      if (value && value.toString().trim() !== "") {
        params.append(field, value.toString());
      } else if (!removeEmptyFields) {
        params.append(field, "");
      }
    });
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  const handleClick = () => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      const queryString = buildQueryString(formData);
      const url = `${basePath}${queryString}`;
      
      // Chama o callback se fornecido
      onSubmitSuccess?.(formData);
      
      // Navega para a nova URL
      router.push(url);
    }
  };

  return (
    <Button 
      type="submit"
      variant={variant}
      disabled={pending}
      onClick={handleClick}
      className="w-full sm:w-auto"
    >
      {pending ? loadingText : text}
    </Button>
  );
}

// Exemplo de uso:
/*
// Uso básico
<ButtonSave />

// Uso personalizado
<ButtonSave 
  urlFields={["userId", "category"]}
  basePath="/posts"
  text="Buscar"
  loadingText="Buscando..."
  variant="outline"
  onSubmitSuccess={(formData) => {
    console.log("Busca realizada:", Object.fromEntries(formData));
  }}
/>

// Uso em um formulário de busca avançada
<ButtonSave 
  urlFields={["search", "category", "status", "date"]}
  removeEmptyFields={true}
  text="Filtrar"
/>
*/