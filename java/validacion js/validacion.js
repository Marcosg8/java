// Validaciones en tiempo real y cálculo sencillo de sostenibilidad

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sostenibilidadForm');
  const mensajes = document.getElementById('mensajes');

  form.addEventListener('input', (e) => {
    const target = e.target;
    if (!target || !('checkValidity' in target)) return;

    if (target.type === 'radio') {
      const radios = form.querySelectorAll(`input[name="${target.name}"]`);
      const anyChecked = Array.from(radios).some(r => r.checked);
      radios.forEach(r => r.setCustomValidity(anyChecked ? '' : 'Selecciona una opción.'));
      return;
    }

    if (target.type === 'checkbox') {
      target.setCustomValidity('');
      return;
    }

    if (!target.checkValidity()) {
      const msg = target.validationMessage || 'Por favor completa este campo correctamente.';
      target.setCustomValidity(msg);
    } else {
      target.setCustomValidity('');
    }
  });

  form.addEventListener('invalid', (e) => {
    e.preventDefault();
    const field = e.target;
    field.focus();
    mensajes.textContent = 'Revisa los campos en rojo.';
  }, true);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajes.textContent = '';

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      mensajes.textContent = 'Revisa los campos en rojo.';
      return;
    }

    const data = new FormData(form);
    const energia = data.get('energia');
    const transporte = data.get('transporte');
    const separa = data.get('separa') === 'si';
    const agua = Number(data.get('agua')) || 0;
    const consumo = data.get('consumo');

    let score = 0;
    if (energia === 'bajo') score += 25;
    if (energia === 'medio') score += 15;
    if (energia === 'alto') score += 5;

    if (transporte === 'activo') score += 25;
    if (transporte === 'publico') score += 18;
    if (transporte === 'privado') score += 5;

    if (separa) score += 15;

    if (agua <= 50) score += 20;
    else if (agua <= 150) score += 10;
    else score += 2;

    if (consumo === 'frecuente') score += 15;
    if (consumo === 'ocasional') score += 8;
    if (consumo === 'rara') score += 2;

    if (score > 100) score = 100;

    let nivel = 'Bajo';
    if (score >= 75) nivel = 'Alto';
    else if (score >= 45) nivel = 'Medio';

    // Mostrar solo el resultado calculado en cliente (se ha eliminado la inserción del HTML del servidor)
    mensajes.innerHTML = `<strong>Puntuación:</strong> ${score} / 100 — <strong>Nivel:</strong> ${nivel}`;

    // Si quieres enviar al servidor sin mostrar su HTML, descomenta y usa fetch sin insertar la respuesta:
    /*
    fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams([...data])
    })
    .catch(() => {
      mensajes.textContent += ' (Error al comunicarse con el servidor)';
    });
    */
  });

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[s]));
  }
});