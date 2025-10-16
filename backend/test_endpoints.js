const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Función para hacer peticiones con manejo de errores
async function makeRequest(method, url, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    console.log(`✅ ${method} ${url} - Status: ${response.status}`);
    return response.data;
  } catch (error) {
    console.log(`❌ ${method} ${url} - Error: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
    return null;
  }
}

// Función principal de pruebas
async function runTests() {
  console.log('🚀 Iniciando pruebas de endpoints...\n');
  
  let token = null;
  let userId = null;
  
  // 1. Probar registro de usuario
  console.log('📝 Probando registro de usuario...');
  const registerData = {
    nombre: 'Usuario Test',
    correo: 'test@example.com',
    contraseña: 'password123',
    rol_id: 1
  };
  
  const registerResult = await makeRequest('POST', '/auth/register', registerData);
  if (registerResult) {
    userId = registerResult.id;
    console.log('Usuario registrado con ID:', userId);
  }
  
  // 2. Probar login
  console.log('\n🔐 Probando login...');
  const loginData = {
    correo: 'test@example.com',
    contraseña: 'password123'
  };
  
  const loginResult = await makeRequest('POST', '/auth/login', loginData);
  if (loginResult && loginResult.token) {
    token = loginResult.token;
    console.log('Login exitoso, token obtenido');
  }
  
  // 3. Probar verificación de token
  console.log('\n🔍 Probando verificación de token...');
  if (token) {
    await makeRequest('GET', '/auth/verify', null, {
      'Authorization': `Bearer ${token}`
    });
  }
  
  // 4. Probar obtener todos los usuarios
  console.log('\n👥 Probando obtener todos los usuarios...');
  await makeRequest('GET', '/usuarios');
  
  // 5. Probar obtener usuario específico
  console.log('\n👤 Probando obtener usuario específico...');
  if (userId) {
    await makeRequest('GET', `/usuarios/${userId}`);
  }
  
  // 6. Probar actualizar usuario
  console.log('\n✏️ Probando actualizar usuario...');
  if (userId) {
    const updateData = {
      nombre: 'Usuario Test Actualizado',
      correo: 'test_actualizado@example.com'
    };
    await makeRequest('PUT', `/usuarios/${userId}`, updateData);
  }
  
  // 7. Probar obtener categorías
  console.log('\n📂 Probando obtener categorías...');
  await makeRequest('GET', '/categorias');
  
  // 8. Probar obtener productos
  console.log('\n📦 Probando obtener productos...');
  await makeRequest('GET', '/productos');
  
  // 9. Probar obtener proveedores
  console.log('\n🏢 Probando obtener proveedores...');
  await makeRequest('GET', '/proveedores');
  
  // 10. Probar obtener inventarios
  console.log('\n📊 Probando obtener inventarios...');
  await makeRequest('GET', '/inventarios');
  
  // 11. Probar obtener movimientos
  console.log('\n🔄 Probando obtener movimientos...');
  await makeRequest('GET', '/movimientos');
  
  // 12. Probar login con credenciales incorrectas
  console.log('\n🚫 Probando login con credenciales incorrectas...');
  const wrongLoginData = {
    correo: 'test@example.com',
    contraseña: 'wrongpassword'
  };
  await makeRequest('POST', '/auth/login', wrongLoginData);
  
  // 13. Probar registro con correo duplicado
  console.log('\n🚫 Probando registro con correo duplicado...');
  await makeRequest('POST', '/auth/register', registerData);
  
  // 14. Probar login sin campos requeridos
  console.log('\n🚫 Probando login sin campos requeridos...');
  await makeRequest('POST', '/auth/login', { correo: 'test@example.com' });
  
  // 15. Probar verificar token sin token
  console.log('\n🚫 Probando verificar token sin token...');
  await makeRequest('GET', '/auth/verify');
  
  console.log('\n✅ Pruebas completadas!');
}

// Ejecutar las pruebas
runTests().catch(console.error); 