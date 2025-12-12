import React from 'react';

interface Props {
  onClose: () => void;
}

const UserManual: React.FC<Props> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
      {/* Print Styles */}
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { background-color: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .manual-container { 
            background-color: white !important; 
            color: black !important; 
            box-shadow: none !important; 
            max-width: 100% !important;
            padding: 0 !important;
          }
          .manual-header { border-bottom: 2px solid #000 !important; margin-bottom: 20px; }
          h1, h2, h3 { color: #000 !important; page-break-after: avoid; }
          p, li { color: #333 !important; }
          .bg-indigo-50 { background-color: #f0f0f0 !important; border: 1px solid #ddd; }
          .text-indigo-700 { color: #000 !important; font-weight: bold; }
        }
      `}</style>

      <div className="min-h-screen py-8 px-4 flex justify-center items-start">
        <div className="manual-container bg-white text-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl p-8 sm:p-12 relative">
          
          {/* Header Controls (No Print) */}
          <div className="no-print absolute top-4 right-4 flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Descargar PDF
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Document Content */}
          <header className="manual-header border-b-2 border-slate-100 pb-6 mb-8">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Manual de Usuario</h1>
            <p className="text-xl text-indigo-600 font-medium mt-2">PsiAgenda v1.0 - Gestión Inteligente para Psicólogos</p>
            <p className="text-slate-500 mt-2 text-sm">Documento de Referencia Oficial</p>
          </header>

          <div className="space-y-10">
            
            {/* 1. Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Introducción
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Bienvenido a <strong>PsiAgenda</strong>. Esta aplicación ha sido diseñada exclusivamente para el uso privado de profesionales de la salud mental. A diferencia de las agendas tradicionales, PsiAgenda almacena los datos <strong>directamente en su dispositivo</strong>, garantizando privacidad total y velocidad instantánea sin depender de internet para consultar sus datos básicos.
              </p>
            </section>

            {/* 2. El Asistente IA (Destacado) */}
            <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Asistente Virtual con IA
              </h2>
              <p className="text-indigo-800 mb-6 leading-relaxed">
                Esta es la función más potente de su agenda. En la parte superior de la pantalla encontrará una barra de búsqueda inteligente. No es un buscador común; es una Inteligencia Artificial (Gemini) que lee su agenda y responde preguntas complejas en lenguaje natural.
              </p>

              <h3 className="font-bold text-indigo-900 mb-3 uppercase text-xs tracking-wider">Ejemplos de uso productivo:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <strong className="text-indigo-600 block mb-1">Planificación del día</strong>
                  <p className="text-sm text-slate-600 italic">"Resúmeme mi día de hoy"</p>
                  <p className="text-sm text-slate-600 italic mt-1">"¿A qué hora termino de trabajar mañana?"</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <strong className="text-indigo-600 block mb-1">Gestión de Pacientes</strong>
                  <p className="text-sm text-slate-600 italic">"¿Cuándo es la próxima sesión de María García?"</p>
                  <p className="text-sm text-slate-600 italic mt-1">"¿Tengo algún paciente con ansiedad esta semana?"</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <strong className="text-indigo-600 block mb-1">Búsqueda de Huecos</strong>
                  <p className="text-sm text-slate-600 italic">"¿Tengo libre el jueves por la tarde?"</p>
                  <p className="text-sm text-slate-600 italic mt-1">"¿Cuántos pacientes veo el viernes?"</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <strong className="text-indigo-600 block mb-1">Información de Contacto</strong>
                  <p className="text-sm text-slate-600 italic">"Dame el teléfono de Juan Pérez"</p>
                  <p className="text-sm text-slate-600 italic mt-1">"¿Cuál es el mail de Lucía?"</p>
                </div>
              </div>
            </section>

            {/* 3. Gestión de Citas */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Gestión de Citas y Recurrencia
              </h2>
              
              <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Crear una Cita</h3>
                    <p className="text-slate-600 mb-2">
                        Pulse el botón flotante <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-xs mx-1">+</span> en la esquina inferior derecha.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                        <li><strong>Datos Básicos:</strong> Nombre, teléfono y fecha son obligatorios.</li>
                        <li><strong>Notas:</strong> Puede agregar observaciones clínicas breves.</li>
                        <li><strong>Repetición (IMPORTANTE):</strong> Al final del formulario, puede seleccionar "Semanal" o "Quincenal". Esto creará automáticamente las citas por los próximos <strong>6 meses</strong>.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Eliminar Citas Recurrentes</h3>
                    <p className="text-slate-600">
                        Al intentar borrar una cita que es parte de una serie (ej: terapia semanal), el sistema le preguntará inteligentemente:
                    </p>
                    <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-800">
                        <p><strong>• Borrar solo este turno:</strong> Ideal si el paciente cancela solo una vez.</p>
                        <p><strong>• Borrar todos los turnos:</strong> Ideal si el paciente termina el tratamiento.</p>
                    </div>
                </div>
              </div>
            </section>

            {/* 4. Seguridad y Respaldos */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Seguridad de Datos (Vital)
              </h2>
              <p className="text-slate-600 mb-4">
                Sus datos viven en su dispositivo. Si pierde su celular o borra los datos del navegador, la información se perderá. Para evitar esto, PsiAgenda incluye un sistema de respaldo robusto.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                    <h3 className="font-bold text-slate-900 mb-2">Botón "Respaldar" (Verde)</h3>
                    <p className="text-sm text-slate-600">
                        Descarga un archivo especial (<code>.json</code>). <br/>
                        <strong>Recomendación:</strong> Haga esto una vez por semana y envíese el archivo a su propio email o guárdelo en Google Drive/iCloud.
                    </p>
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 mb-2">Botón "Restaurar"</h3>
                    <p className="text-sm text-slate-600">
                        Si cambia de celular, simplemente entre a la app vacía, pulse "Restaurar" y seleccione el último archivo <code>.json</code> que guardó. Toda su agenda aparecerá mágicamente.
                    </p>
                 </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm font-medium">
                  La aplicación le avisará automáticamente con un cartel amarillo si pasan más de 7 días sin que realice una copia de seguridad.
              </div>
            </section>

             {/* 5. Vistas y Excel */}
             <section className="break-inside-avoid">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Vistas y Reportes
              </h2>
              <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                      <span className="font-bold text-indigo-600">Vista Agenda:</span>
                      Lista detallada del día seleccionado. Muestra notas, teléfonos y emails para contacto rápido.
                  </li>
                  <li className="flex items-start gap-2">
                      <span className="font-bold text-indigo-600">Vista Calendario:</span>
                      Panorama mensual. Los días con citas tienen indicadores visuales (puntos).
                  </li>
                  <li className="flex items-start gap-2">
                      <span className="font-bold text-indigo-600">Botón Excel:</span>
                      Descarga toda su base de datos en formato <code>.csv</code> compatible con Excel, ideal para contabilidad o estadísticas anuales.
                  </li>
              </ul>
            </section>

          </div>

          <footer className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
            <p>Generado automáticamente desde PsiAgenda</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
