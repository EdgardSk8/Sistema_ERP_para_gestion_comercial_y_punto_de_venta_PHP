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
        ], drawCallback: function () { AnimarFilasVisibles(this.api()); }, order: [[0, 'desc']],

    });

    configurarToggleColumnas('tablaMovimientosGastos');

};