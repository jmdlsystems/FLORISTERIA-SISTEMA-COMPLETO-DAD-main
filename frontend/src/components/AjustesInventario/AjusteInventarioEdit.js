import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AjusteInventarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Mostrar mensaje y redirigir
    alert('❌ No se pueden editar ajustes de inventario\n\n🔒 Los ajustes son registros de auditoría que no pueden modificarse para mantener la integridad de los datos.\n\n💡 Para corregir un error, cree un nuevo ajuste que compense la diferencia.');
    navigate('/sistema/ajustes-inventario');
  }, [id, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Edición No Permitida
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p className="mb-2">
                  <strong>Los ajustes de inventario no se pueden editar</strong> para mantener la integridad de la auditoría.
                </p>
                <p className="mb-2">
                  <strong>Razones:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Preservar la trazabilidad completa</li>
                  <li>Mantener la integridad de los datos</li>
                  <li>Evitar inconsistencias en el inventario</li>
                  <li>Cumplir con estándares de auditoría</li>
                </ul>
                <p className="mt-3">
                  <strong>Solución:</strong> Para corregir un error, cree un nuevo ajuste que compense la diferencia.
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/sistema/ajustes-inventario')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  Volver a Ajustes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjusteInventarioEdit; 