'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('productos', [
      {
        id: 1,
        nombre: 'Rosa Roja',
        descripcion: 'Rosa roja de tallo largo, perfecta para arreglos románticos',
        precio: 25.00,
        categoria_id: 1, // Rosas
        proveedor_id: 1, // Flores del Valle
        imagen: 'rosa_roja.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Rosa Blanca',
        descripcion: 'Rosa blanca elegante, ideal para bodas y eventos especiales',
        precio: 28.00,
        categoria_id: 1, // Rosas
        proveedor_id: 1, // Flores del Valle
        imagen: 'rosa_blanca.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Tulipán Amarillo',
        descripcion: 'Tulipán amarillo vibrante, símbolo de alegría y amistad',
        precio: 18.00,
        categoria_id: 2, // Tulipanes
        proveedor_id: 2, // Vivero San Pedro
        imagen: 'tulipan_amarillo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Tulipán Rosa',
        descripcion: 'Tulipán rosa delicado, perfecto para arreglos primaverales',
        precio: 20.00,
        categoria_id: 2, // Tulipanes
        proveedor_id: 2, // Vivero San Pedro
        imagen: 'tulipan_rosa.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Girasol Grande',
        descripcion: 'Girasol grande y alegre, ideal para arreglos festivos',
        precio: 15.00,
        categoria_id: 3, // Girasoles
        proveedor_id: 3, // Invernaderos La Esperanza
        imagen: 'girasol_grande.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nombre: 'Lirio Blanco',
        descripcion: 'Lirio blanco fragante, símbolo de pureza y elegancia',
        precio: 35.00,
        categoria_id: 4, // Lirios
        proveedor_id: 4, // Flores Exóticas del Sur
        imagen: 'lirio_blanco.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nombre: 'Margarita Blanca',
        descripcion: 'Margarita blanca simple y elegante, perfecta para arreglos minimalistas',
        precio: 12.00,
        categoria_id: 5, // Margaritas
        proveedor_id: 5, // Vivero Los Pinos
        imagen: 'margarita_blanca.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nombre: 'Orquídea Phalaenopsis',
        descripcion: 'Orquídea Phalaenopsis blanca, planta elegante de larga duración',
        precio: 120.00,
        categoria_id: 6, // Orquídeas
        proveedor_id: 6, // Flores de Importación Premium
        imagen: 'orquidea_phalaenopsis.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        nombre: 'Crisantemo Amarillo',
        descripcion: 'Crisantemo amarillo brillante, perfecto para arreglos otoñales',
        precio: 22.00,
        categoria_id: 7, // Crisantemos
        proveedor_id: 7, // Vivero El Paraíso
        imagen: 'crisantemo_amarillo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        nombre: 'Arreglo Romántico',
        descripcion: 'Arreglo floral romántico con rosas rojas y blancas',
        precio: 150.00,
        categoria_id: 8, // Arreglos Florales
        proveedor_id: 8, // Flores y Plantas Express
        imagen: 'arreglo_romantico.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        nombre: 'Planta Suculenta',
        descripcion: 'Planta suculenta en maceta decorativa, ideal para interiores',
        precio: 45.00,
        categoria_id: 9, // Plantas de Interior
        proveedor_id: 5, // Vivero Los Pinos
        imagen: 'planta_suculenta.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        nombre: 'Lazo Decorativo',
        descripcion: 'Lazo decorativo de satín rojo, perfecto para complementar arreglos',
        precio: 8.00,
        categoria_id: 10, // Accesorios
        proveedor_id: 8, // Flores y Plantas Express
        imagen: 'lazo_decorativo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        nombre: 'Rosa Rosa',
        descripcion: 'Rosa rosa suave, ideal para expresar gratitud y aprecio',
        precio: 26.00,
        categoria_id: 1, // Rosas
        proveedor_id: 1, // Flores del Valle
        imagen: 'rosa_rosa.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        nombre: 'Tulipán Morado',
        descripcion: 'Tulipán morado elegante, perfecto para arreglos sofisticados',
        precio: 24.00,
        categoria_id: 2, // Tulipanes
        proveedor_id: 2, // Vivero San Pedro
        imagen: 'tulipan_morado.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        nombre: 'Girasol Pequeño',
        descripcion: 'Girasol pequeño y adorable, ideal para arreglos compactos',
        precio: 12.00,
        categoria_id: 3, // Girasoles
        proveedor_id: 3, // Invernaderos La Esperanza
        imagen: 'girasol_pequeno.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('productos', {
      nombre: [
        'Rosa Roja', 'Rosa Blanca', 'Tulipán Amarillo', 'Tulipán Rosa', 'Girasol Grande',
        'Lirio Blanco', 'Margarita Blanca', 'Orquídea Phalaenopsis', 'Crisantemo Amarillo',
        'Arreglo Romántico', 'Planta Suculenta', 'Lazo Decorativo', 'Rosa Rosa',
        'Tulipán Morado', 'Girasol Pequeño'
      ]
    }, {});
  }
}; 