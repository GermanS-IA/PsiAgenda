import { GoogleGenAI } from "@google/genai";
import { Appointment } from '../types';

// Helper to convert ISO YYYY-MM-DD to DD/MM/YYYY for natural language context
const formatDateForAI = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
};

export const askScheduleQuery = async (query: string, appointments: Appointment[]): Promise<string> => {
    try {
        // CORRECCIÓN CRÍTICA FINAL PARA VERCEL/VITE:
        // En un entorno Vercel + Vite, la clave API se lee usando import.meta.env
        // La variable debe tener el prefijo VITE_ para ser accesible en el navegador.
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
             console.error("API Key no configurada.");
             // Mensaje amigable para el usuario si olvida configurar la variable de entorno en Vercel
             return "Lo siento, la clave de la API de Gemini no está configurada. Contacta al administrador para que establezca VITE_GEMINI_API_KEY en Vercel.";
        }
        
        // Initialize the client with the environment variable
        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        // We feed the appointments as context, formatting dates for better understanding
        const contextData = JSON.stringify(appointments.map(a => ({
            paciente: a.PACIENTE,
            fecha: formatDateForAI(a.FECHA_INICIO),
            hora: a.HORA_INICIO,
            recurrente: a.RECURRENCIA,
            notas: a.NOTAS || ''
        })));

        const systemPrompt = `
        Eres un asistente de agenda para psicólogos. Tienes estos datos de turnos: ${contextData}
        Hoy es: ${new Date().toLocaleDateString('es-ES')}\n
        Instrucciones CRÍTICAS:\n
        1. Responde en MÁXIMO 2 oraciones.\n
        2. Sé extremadamente directo y breve.\n
        3. No uses saludos largos ni despedidas.\n
        4. Si es una lista, usa formato simple.\n
        5. Las fechas están en formato DD/MM/YYYY.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: query,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.1, 
            }
        });

        return response.text || "No pude procesar la respuesta.";

    } catch (error) {
        console.error("Error querying Gemini:", error);
        return "Lo siento, hubo un problema al consultar la inteligencia artificial. Por favor intenta más tarde.";
    }
};
