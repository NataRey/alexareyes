document.addEventListener('DOMContentLoaded', () => {
    const castingForm = document.getElementById('premiumCastingForm');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('filePreviewContainer');
    
    // Almacén temporal para los archivos seleccionados (Máximo 3)
    let selectedFiles = [];

    // Trigger para abrir el explorador de archivos al hacer clic en la zona
    dropZone.addEventListener('click', () => fileInput.click());

    // Eventos visuales para el arrastre (Drag & Drop)
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--dorado-elegante)';
        dropZone.style.backgroundColor = 'rgba(200, 169, 107, 0.03)';
    });

    dropZone.addEventListener('dragleave', () => {
        resetDropZoneStyle();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        resetDropZoneStyle();
        handleFiles(e.dataTransfer.files);
    });

    // Evento cuando seleccionan archivos desde el explorador nativo
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function resetDropZoneStyle() {
        dropZone.style.borderColor = 'rgba(200, 169, 107, 0.3)';
        dropZone.style.backgroundColor = 'var(--negro-alterno)';
    }

    // Procesamiento y renderizado de imágenes/archivos en blanco
    function handleFiles(files) {
        // Combinamos y limitamos estrictamente a 3 archivos para mantener el estándar editorial
        const newFiles = Array.from(files);
        selectedFiles = [...selectedFiles, ...newFiles].slice(0, 3);

        // Limpiar contenedor de previsualización
        previewContainer.innerHTML = '';

        selectedFiles.forEach((file, index) => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const previewBox = document.createElement('div');
                previewBox.className = 'preview-box-blank';
                previewBox.style.position = 'relative';
                
                // Muestra el nombre del archivo simulando el espacio de la foto
                previewBox.innerHTML = `
                    <span style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-right:20px;">
                        ${file.name}
                    </span>
                    <button type="button" data-index="${index}" style="
                        position: absolute; 
                        right: 10px; 
                        top: 50%; 
                        transform: translateY(-50%);
                        background: transparent; 
                        border: none; 
                        color: var(--dorado-elegante); 
                        cursor: pointer;
                        font-weight: bold;
                    ">✕</button>
                `;

                previewContainer.appendChild(previewBox);
            };
            reader.readAsDataURL(file);
        });
    }

    // Delegación de eventos para eliminar fotos de la lista
    previewContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const indexToRemove = parseInt(e.target.getAttribute('data-index'));
            selectedFiles.splice(indexToRemove, 1);
            // Volver a renderizar la lista actualizada
            handleFiles([]);
        }
    });

    // Envío del Formulario con Animación Cinematográfica
    castingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector('.btn-submit-premium');
        const originalText = submitBtn.innerText;
        
        // Cambio de estado visual (Feedback de Lujo)
        submitBtn.innerText = 'PROCESANDO APLICACIÓN...';
        submitBtn.style.opacity = '0.5';
        submitBtn.style.pointerEvents = 'none';

        // Simulación de envío al servidor / API
        setTimeout(() => {
            submitBtn.innerText = 'APLICACIÓN ENVIADA CON ÉXITO';
            submitBtn.style.borderColor = '#4FFF9E'; // Verde sutil de éxito de interfaz
            submitBtn.style.color = '#4FFF9E';
            submitBtn.style.opacity = '1';

            // Reseteo elegante tras 3 segundos
            setTimeout(() => {
                castingForm.reset();
                selectedFiles = [];
                previewContainer.innerHTML = '';
                submitBtn.innerText = originalText;
                submitBtn.style.borderColor = 'var(--dorado-elegante)';
                submitBtn.style.color = 'var(--blanco-marfil)';
                submitBtn.style.pointerEvents = 'auto';
            }, 3000);

        }, 2000);
    });
});