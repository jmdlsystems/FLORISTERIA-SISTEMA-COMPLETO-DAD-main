import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriasService } from '../../services/categoriasService';

const CategoriaCreate = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagenFile, setImagenFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    setImagenFile(e.target.files[0] || null);
    setUploadError('');
  };

  const handlePaste = (e) => {
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0];
      if (file.type.startsWith('image/')) {
        setImagenFile(file);
        setUploadError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUploadError('');

    if (!imagenFile) {
      setError('Debes seleccionar o pegar una imagen.');
      setLoading(false);
      return;
    }

    setUploading(true);
    let nombreImagen = '';
    try {
      const formData = new FormData();
      formData.append('imagen', imagenFile);
      const response = await fetch('https://grupo01tdam.pythonanywhere.com/upload/categoria', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Error subiendo la imagen');
      const data = await response.json();
      if (data && data.imagen) {
        nombreImagen = data.imagen;
      } else {
        throw new Error('Respuesta inesperada de la API de imágenes');
      }
    } catch (err) {
      setUploadError('No se pudo subir la imagen. ' + err.message);
      setUploading(false);
      setLoading(false);
      return;
    }
    setUploading(false);

    const res = await categoriasService.create({ nombre, descripcion, imagen: nombreImagen });
    setLoading(false);
    if (res.success) {
      navigate('/sistemafloreria/categorias');
    } else {
      setError(res.error);
    }
  };

  const handleCancel = () => {
    navigate('/sistemafloreria/categorias');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Nueva Categoría</h1>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-800 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {(error || uploadError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error || uploadError}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Rosas, Tulipanes, etc."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe las características de esta categoría..."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
                Imagen *
              </label>
              <div
                className="w-full border border-gray-300 rounded-md bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200"
                tabIndex={0}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onPaste={handlePaste}
                style={{ minHeight: 120 }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {imagenFile ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(imagenFile)}
                      alt="preview"
                      className="h-20 w-20 object-cover rounded mb-2 mx-auto"
                      style={{ maxWidth: 80, maxHeight: 80 }}
                    />
                    <p className="text-sm text-gray-600">Imagen seleccionada</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-400 text-sm">Haz clic o pega una imagen aquí</span>
                  </div>
                )}
              </div>
              {uploading && (
                <div className="mt-2 text-blue-600 text-sm flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subiendo imagen...
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading || uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {uploading ? 'Subiendo...' : 'Guardando...'}
                  </>
                ) : (
                  'Guardar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriaCreate; 