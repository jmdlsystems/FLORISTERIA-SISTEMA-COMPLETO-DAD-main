import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosService } from '../../services/productosService';
import { categoriasService } from '../../services/categoriasService';
import { proveedoresService } from '../../services/proveedoresService';

const ProductoCreate = () => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', categoria_id: '', proveedor_id: '', imagen: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [imagenFile, setImagenFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await categoriasService.getAll();
      if (catRes.success) setCategorias(catRes.data);
      const provRes = await proveedoresService.getAll();
      if (provRes.success) setProveedores(provRes.data);
    };
    fetchData();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImagenFile(e.target.files[0] || null);
    setUploadError('');
  };

  // Permitir pegar imagen desde portapapeles
  const handlePaste = (e) => {
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0];
      if (file.type.startsWith('image/')) {
        setImagenFile(file);
        setUploadError('');
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUploadError('');
    let nombreImagen = form.imagen;

    if (!imagenFile) {
      setError('Debes seleccionar o pegar una imagen.');
      setLoading(false);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('imagen', imagenFile);
      const response = await fetch('https://grupo01tdam.pythonanywhere.com/upload/producto', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Error subiendo la imagen');
      const data = await response.json();
      if (data && data.imagen) {
        nombreImagen = data.imagen;
        setForm(f => ({ ...f, imagen: data.imagen }));
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

    const res = await productosService.create({ ...form, imagen: nombreImagen });
    setLoading(false);
    if (res.success) {
      navigate('/sistemafloreria/productos');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1">Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Precio</label>
          <input 
            type="number" 
            name="precio" 
            value={form.precio} 
            onChange={handleChange} 
            step="0.01" 
            min="0" 
            required 
            className="w-full border px-3 py-2 rounded" 
          />
        </div>
        <div>
          <label className="block mb-1">Categoría</label>
          <select name="categoria_id" value={form.categoria_id} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Seleccione una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Proveedor</label>
          <select name="proveedor_id" value={form.proveedor_id} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>{prov.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Imagen (archivo o pega una imagen aquí)</label>
          <div
            className="w-full border px-3 py-2 rounded bg-gray-50 flex flex-col items-center justify-center cursor-pointer"
            tabIndex={0}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onPaste={handlePaste}
            style={{ minHeight: 90 }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            {imagenFile ? (
              <img
                src={URL.createObjectURL(imagenFile)}
                alt="preview"
                className="h-20 w-20 object-cover rounded mb-2"
                style={{ maxWidth: 80, maxHeight: 80 }}
              />
            ) : (
              <span className="text-gray-400">Haz clic o pega una imagen aquí</span>
            )}
          </div>
          {uploading && <div className="text-blue-500">Subiendo imagen...</div>}
          {uploadError && <div className="text-red-500">{uploadError}</div>}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={() => navigate('/sistemafloreria/productos')} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button type="submit" disabled={loading || uploading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">{loading ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  );
};

export default ProductoCreate; 