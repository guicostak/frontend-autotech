export function convertFileToBase64 (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export async function convertUrlToBase64(url: string): Promise<string> {
    try {
        const response = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao buscar a URL: ${response.statusText}`);
        }

        // Converte a resposta para Blob
        const blob = await response.blob();

        // Converte o Blob para Base64
        return await convertBlobToBase64(blob);
    } catch (error: any) {
        throw new Error(`Erro ao converter URL para Base64: ${error.message}`);
    }
}

function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}
