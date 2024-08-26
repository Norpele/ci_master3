<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <buton type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </buton>
                </div>
                <form action="#">
                    <div class="modal-body">
                        <div class="row">
                            <div class=" col-12">
                                <div class="form-group">
                                    <label for="first-name-column">Code</label>
                                    <input id="txcode" type="text" class="form-control" placeholder="Code" name="fname-column" maxlength="3">
                                </div>
                            </div>
                            <div class=" col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Name</label>
                                    <input id="txname" type="text" class="form-control" placeholder="Nama" name="lname-column">
                                </div>
                            </div>
                            <div class=" col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal</label>
                                    <input id="txnominal" class="form-control angka" oninput="Pembagian()" name="txnominal">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Total Hari Dibayar</label>
                                    <input id="txday" type="number" class="form-control" oninput="Pembagian()" name="txday">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal / hari</label>
                                    <input id="txgajiTotal" type="text" class="form-control" disabled name="txgajiTotal">
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="city-column">Setengah Hari</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txsetengahhari" onchange="togglePersentAmount()"> >
                                            <option value="" disabled selected>Pilih hari</option>
                                            <option value="0">Digaji</option>
                                            <option value="1">Tidak Digaji</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="city-column">Persent / Amount</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txgaji" onchange="amountandpercen()" disabled> >
                                            <option value="" disabled selected>Pilih Potongan</option>
                                            <option value="0">persent</option>
                                            <option value="1">amount</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="txpersenpokok" id="label-persent-amount">Persen Pokok / Perhari</label>
                                    <input type="text" class="form-control" id="txpersenpokok" placeholder="Masukkan Berapa Persen" onkeyup="validateInput(); formatWithCommas(this)" disabled >
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" onclick="btn_close()" data-bs-dismiss="modal">
                                    <i class="bx bx-x d-block d-sm-none"></i>
                                    <span class="btn-closed d-none d-sm-block ">Close</span>
                                </button>
                                <button type="button" class="btn btn-primary btn-submit ms-1" onclick="simpan_data()">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block">Submit</span>
                                </button>
                                <button type="button" class="btn btn-warning btn-editen ms-1" onclick="update_data()">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block udt">Update</span>
                                </button>
                            </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
<div class="card card-dta">
    <div class="card-header">
        <h5 class="card-title">
            Form Golongan
        </h5>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="bi bi-plus-lg"> </i>Add</button>
        <button class="btn btn-primary" onclick="load_data()"><i class="bi bi-arrow-clockwise"> </i>Refresh</button>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table2">
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Nominal</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
</section>
</div>
</div>
</section>
</div>
</section>
</div>
</div>


</body>

</html>