$(function(){

    // CSRF
    const token = document.querySelector('meta[name="csrf-token"]')?.content;
    if (token) { $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': token } }); }

    if (!$('#modalConfirmarLogout').length) {
        $('body').append(`
            <div class="modal fade" id="modalConfirmarLogout" tabindex="-1" aria-hidden="true">

                <div class="modal-dialog modal-dialog-centered">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title">Cerrar Sesión</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">

                            <div class="card-responsive">
                                ¿Estás seguro de que deseas cerrar sesión?
                            </div>

                        </div>

                        <div class="modal-footer">
                            <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn actualizar btn-sm-modal" id="confirmarLogout">Cerrar Sesión</button>
                        </div>

                    </div>

                </div>

            </div>
        `);
    }

    const modalEl = document.getElementById('modalConfirmarLogout');
    const modal = new bootstrap.Modal(modalEl);

    // ABRIR
    $(document).on('click', '#btnLogout', () => modal.show());

    // LOGOUT
    $(document).on('click', '#confirmarLogout', function(){
        const btn = $(this).prop('disabled', true);
        $.post('/logout').done(res => { if(res.success){ modal.hide(); setTimeout(() => window.location.href = '/login', 100); } })
        .always(() => btn.prop('disabled', false));
    });

});