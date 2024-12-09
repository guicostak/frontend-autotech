export function removeNumbers(input: string): string {
    if (!input) {
        return input || "";
    }

    return input.replace(/[0-9]/g, '');
}

export function removeSpecialChars(input: string): string {
    if (!input) {
        return input || ""; 
    }

    return input.replace(/[^a-zA-Z0-9\s]/g, '');
}

export function removeLetters(input: string): string {
    if (!input) {
        return input || ""; 
    }

    return input.replace(/[a-zA-Z]/g, '');
}


export function hasOnlyNumbers(input: string): boolean {
    const numbersOnlyRegex = /^\d+$/;
    
    return numbersOnlyRegex.test(input)
}

export function hasOnlyLetters(input: string): boolean {
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    
    return lettersOnlyRegex.test(input);
}

export function isNotEmpty(input: string): boolean {
    return input.trim().length > 0;
}

export function enderecoToString(endereco: { rua: string; numero: string; bairro: string; complemento?: string }) {
    const { rua, numero, bairro, complemento } = endereco;
    
    let enderecoFormatado = `${rua}, ${numero}, ${bairro}`;
    
    if (complemento) {
        enderecoFormatado += `, ${complemento}`;
    }
    
    return enderecoFormatado;
}

export function formatarValor(valor: string  | null) {
    if(valor) {
    // Remove o símbolo de R$ e espaços
    const valorLimpo = valor.replace(/R\$|\s/g, '');
    // Substitui a vírgula por um ponto e converte para float
    return parseFloat(valorLimpo.replace(',', '.')).toFixed(2);
    }
}

export function formatarValorBRL(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valor);
  }

  export function formatarValorBRLString(valor: string): string {
    const numero = parseFloat(valor.replace(/[^0-9.-]+/g, ''));

    if (isNaN(numero)) {
        return 'R$ 0,00';
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(numero);
}



export function truncateString(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.slice(0, maxLength) + '...';
  }
  
  export const removeSpecialCharsAndLetters = (value: string) => {
    return value.replace(/[^0-9.]/g, '');
};

export function getFirstAndLastName(fullName: string): string {
    if (!fullName.trim()) {
        return '';
    }

    const nameParts = fullName.trim().split(/\s+/); 
    if (nameParts.length === 1) {
        return nameParts[0];
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1]; 

    return `${firstName} ${lastName}`;
}
  
export function formatPhoneNumber(phone: string): string {
    // Remove quaisquer caracteres não numéricos
    const digits = phone.replace(/\D/g, '');

    // Valida o número de dígitos
    if (digits.length < 10 || digits.length > 11) {
        return 'Número inválido';
    }

    // Extrai os grupos de dígitos
    const ddd = digits.slice(0, 2); // Código de área (DDD)
    const firstPart = digits.length === 11 ? digits.slice(2, 7) : digits.slice(2, 6); // Primeira parte
    const secondPart = digits.length === 11 ? digits.slice(7) : digits.slice(6); // Segunda parte

    // Formata no estilo (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    return `(${ddd}) ${firstPart}-${secondPart}`;
}
