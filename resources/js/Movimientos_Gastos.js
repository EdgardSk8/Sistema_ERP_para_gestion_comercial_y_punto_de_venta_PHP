export default function initMovimientoGasto() {

    document.getElementById('titulo').textContent = 'HISTORIAL DE GASTOS';

    let tabla = $('#tablaMovimientosGastos').DataTable({

        responsive: true,
        processing: true,

        ajax: { 
            url: '/movimientos-gastos/mostrar', 
            type: 'GET', 
            dataSrc: 'movimientos' 
        },

        columns: [

            { data: 'id' },
            { data: 'usuario.nombre' },
            

            { 
                data: 'fecha', 
                render: function(data){
                    return formatearFechaDiaHora(data);
                } 
            },
            
{ data: 'gasto.nombre' },
            { 
                data: 'origen',
                render: function(data){
                    return data === 'CAJA'
                        ? '<strong class="text-primary">CAJA</span>'
                        : '<strong class="text-secondary">CUENTA</span>';
                }
            },

            { 
                data: 'caja',
                render: function(data){
                    return data ? '<strong>Caja #' + data.id : '—';
                }
            },

            { 
                data: 'cuenta',
                render: function(data){
                    return data ? data.nombre : '—';
                }
            },

            { data: 'monto',
                render: function(data){ return '<strong class="text-danger">' + moneda(data) + '</strong>'; }
            },

            { 
                data: 'observacion',
                render: function(data){
                    return data ?? '—';
                }
            }
        ],

        columnDefs: [
            { targets: 0, visible: $('.toggle-col[data-column="0"]').is(':checked') },
            { targets: 1, visible: $('.toggle-col[data-column="1"]').is(':checked') },
            { targets: 2, visible: $('.toggle-col[data-column="2"]').is(':checked') },
            { targets: 3, visible: $('.toggle-col[data-column="3"]').is(':checked') },
            { targets: 4, visible: $('.toggle-col[data-column="4"]').is(':checked') },
            { targets: 5, visible: $('.toggle-col[data-column="5"]').is(':checked') },
            { targets: 6, visible: $('.toggle-col[data-column="6"]').is(':checked') },
            { targets: 7, visible: $('.toggle-col[data-column="7"]').is(':checked') },
            { targets: 8, visible: $('.toggle-col[data-column="8"]').is(':checked') },
        ],

        order: [[0, 'desc']],

    });

    configurarToggleColumnas('tablaMovimientosGastos');

};