export default function initMostrarProductoVariaciones() {

    document.getElementById('titulo').textContent = 'GESTIÓN DE VARIACIONES DE PRODUCTOS';
    
    // INICIALIZACION DE TABLA
    const tabla = $('#tablaProductoVariaciones').DataTable({

        ajax:{
            url:'/producto-variaciones/mostrar',
            type:'GET',
            dataSrc:'variaciones'
        },

        columns:[
            { data:'producto.nombre_producto', defaultContent:'—' },
            { data:'color', defaultContent:'—' },

            { data:'estado_variacion',
                render:function(data){
                    return data == 1
                    ? '<span class="estado estado-activo">Activo</span>'
                    : '<span class="estado estado-inactivo">Inactivo</span>';
                }
            },
            {
                data:'id_variacion',
                orderable:false,
                searchable:false,

                render:function(data,type,row){

                    let botonEstado = row.estado_variacion == 1

                    ? `<button class="btn-baja bajaProductoVariacion" data-id="${data}">
                            <i class="fa-solid fa-ban"></i>
                    </button>`

                    : `<button class="btn-alta bajaProductoVariacion" data-id="${data}">
                            <i class="fa-solid fa-circle-check"></i>
                    </button>`;

                    return `
                        <button class="btn-editar editarProductoVariacion" data-id="${data}">
                            <i class="fa-solid fa-pencil-alt"></i>
                        </button>

                        <button class="btn-detalle detalleProductoVariacion" data-id="${data}">
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        ${botonEstado}
                    `;
                }
            }
        ],

        order:[ [0,'asc'],[1,'asc'] ],

        drawCallback:function(){
            AnimarFilasVisibles(this.api());
        },

        initComplete:function(){
            ConfigurarFiltrosDataTable(this,{
                columnasSelect:[0,1],
                columnasIgnorar:[3]
            });
        }

    });

    configurarToggleColumnas('tablaProductoVariaciones');


    // EVENTO DE MOSTRAR ESTADOS
    $('#toggleInactivosProductoVariaciones').off('change').on('change',function(){
        tabla.draw();
    });

    $.fn.dataTable.ext.search.push(function(settings,data){

        if(settings.nTable.id !== 'tablaProductoVariaciones') return true;

        const ocultar = $('#toggleInactivosProductoVariaciones').is(':checked');

        if(!ocultar) return true; 
        
        return data[2].includes('Activo');
    });


    function Validacion(id_producto,color) {

        if(!id_producto || id_producto === ''){
            mostrarToast('Seleccione un producto','danger');
            return false;
        }

        if(!color || color.trim() === ''){
            mostrarToast('El color es obligatorio','danger');
            return false;
        }

        return true;
    }


    // EVENTO DE GUARDAR VARIACION
    $('#btnGuardarProductoVariacion').off('click').on('click',function(){

        const producto = $('#crear_id_producto').val();
        const color = $('#crear_color').val().trim();

        if(!Validacion(producto,color)) return;

        $.ajax({

            url:'/producto-variaciones/crear',
            type:'POST',

            data:{
                id_producto:producto,
                color:color,
                _token:$('meta[name="csrf-token"]').attr('content')
            },

            success:function(){
                mostrarToast('Variación creada correctamente','success');
                $('#formCrearProductoVariacion')[0].reset();
                bootstrap.Modal.getInstance(document.getElementById('modalCrearProductoVariacion')).hide();
                tabla.ajax.reload(null,false);
            },
            
            error:function(xhr,status,error){

                console.error('Estado:',status);
                console.error('Error:',error);
                console.error('Respuesta:',xhr.responseText);

                let mensaje='Ocurrió un error al crear la variación.';

                if(xhr.responseJSON){
                    if(xhr.responseJSON.mensaje){
                        mensaje=xhr.responseJSON.mensaje;
                    }else if(xhr.responseJSON.message){
                        mensaje=xhr.responseJSON.message;
                    }
                }

                mostrarToast(mensaje,'danger');
            }

        });

    });


    // EVENTO DE EDITAR VARIACION
    $('#tablaProductoVariaciones').off('click').on('click','.editarProductoVariacion',function(){

        const id=$(this).data('id');

        $.get(`/producto-variaciones/editar/${id}`,function(res){

            const variacion=res.variacion;

            $('#editar_id_variacion').val(variacion.id_variacion);
            $('#editar_id_producto').val(variacion.id_producto);
            $('#editar_color').val(variacion.color);
            $('#editar_estado_variacion').val(variacion.estado_variacion);

            new bootstrap.Modal(document.getElementById('modalEditarProductoVariacion')).show();

        });

    });


    // EVENTO DE ACTUALIZAR VARIACION
    $('#btnActualizarProductoVariacion').off('click').on('click',function(){

        const id=$('#editar_id_variacion').val();
        const producto=$('#editar_id_producto').val();
        const color=$('#editar_color').val().trim();
        const estado=$('#editar_estado_variacion').val();

        if(!Validacion(producto,color)) return;

        $.ajax({

            url:`/producto-variaciones/actualizar/${id}`,
            type:'PUT',

            data:{
                id_producto:producto,
                color:color,
                estado_variacion:estado,
                _token:$('meta[name="csrf-token"]').attr('content')
            },

            success:function(){
                mostrarToast('Variación actualizada correctamente','success');
                bootstrap.Modal.getInstance(document.getElementById('modalEditarProductoVariacion')).hide();
                tabla.ajax.reload(null,false);
            },

            error:function(xhr){

                let mensaje='Ocurrió un error al actualizar la variación.';

                if(xhr.responseJSON?.mensaje){
                    mensaje=xhr.responseJSON.mensaje;
                }else if(xhr.responseJSON?.message){
                    mensaje=xhr.responseJSON.message;
                }

                mostrarToast(mensaje,'danger');
            }

        });

    });


    // EVENTO PARA MOSTRAR DETALLE DE VARIACION
    $('#tablaProductoVariaciones').off('click.detalle').on('click.detalle','.detalleProductoVariacion',function(){

        const id=$(this).data('id');

        window.location.href=`/producto-variaciones/detalle/${id}`;

    });


    document.addEventListener("click",async function(e){

        if(e.target.classList.contains("bajaProductoVariacion")){

            const id=e.target.dataset.id;
            let modalElement=document.getElementById("modalConfirmarEstadoProductoVariacion");

            if(!modalElement){

                const modalHTML=`
                    <div class="modal fade" id="modalConfirmarEstadoProductoVariacion" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h5 class="modal-title">Confirmar acción</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <div class="modal-body">
                                    <div class="card-responsive">
                                        ¿Deseas cambiar el estado de esta variación?
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn actualizar btn-sm-modal" id="confirmarCambioEstadoProductoVariacion">Confirmar</button>
                                </div>

                            </div>
                        </div>
                    </div>`;

                document.body.insertAdjacentHTML("beforeend",modalHTML);
                modalElement=document.getElementById("modalConfirmarEstadoProductoVariacion");
            }

            const modal=new bootstrap.Modal(modalElement);
            modal.show();

            modalElement.querySelector("#confirmarCambioEstadoProductoVariacion").onclick=async function(){

                try{

                    const response=await fetch(`/producto-variaciones/cambiar-estado/${id}`,{
                        method:"PUT",
                        headers:{
                            "X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                        }
                    });

                    const data=await response.json();

                    if(data.success){
                        mostrarToast("Estado de la variación actualizado","success");
                        $('#tablaProductoVariaciones').DataTable().ajax.reload(null,false);
                    }else{
                        mostrarToast("Error al cambiar estado","danger");
                    }

                }catch(error){
                    mostrarToast("Error de conexión","danger");
                    console.error(error);
                }

                modal.hide();
            };
        }
    });


}