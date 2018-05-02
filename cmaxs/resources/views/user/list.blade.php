@extends('layouts.white')

@section('title',__('users-general.head_list_user'))

@section('style')
    <link rel="stylesheet" href="{{asset("/css/user-general.css")}}">
@endsection

@section('menu_header')
    @include('elements.service_menu')
@endsection

@section('body-class', 'list-common-user')

@section('content')
    <div class="main-content" id="user-general">
        <h1 class="main-heading">Text goes here</h1>
        <div class="main-summary user-list">
            <div class="alert alert-warning">
                <div class="block-warning">
                    <label class="control-label lbl-format-email">
                        This is text heading
                   </label>
                </div>
            </div>
            <div class="alert alert-success">
                 <div class="block-success">
                       <i class="fa fa-check" aria-hidden="true"></i>
                       <label>OK. Done save user</label>
                  </div>
            </div>
            
            <div class="list-form">
                {!!
                    Form::open([
                        'method' => 'GET'
                    ])
                !!}
                <div class="form-group">
                    <div class="left-side">
                        <label class="label-control">User Id</label>
                    </div>
                    <div class="right-side">
                        {!! Form::text('user_id', null, ['class' => 'form-control' ] ) !!}
                    </div>
                </div>
               
                <div class="form-group">
                    <div class="left-side">
                        <label class="label-control">gddhg</label>
                    </div>
                    <div class="right-side">
                        {!! Form::text('login_id', null, ['class' => 'form-control' ] ) !!}
                    </div>
                </div>

                <div class="form-group">
                    <div class="left-side">
                        <label class="label-control">abdcd</label>
                    </div>
                    <div class="right-side">
                        {!! Form::text('user_name', null, ['class' => 'form-control' ] ) !!}
                    </div>
                </div>
                
                <div class="form-group student-block" >
                    <div class="left-side">
                        <label class="label-control label-table">Group User</label>
                    </div>
                    <div class="right-side">
                        <table class="table table-blue table-dropdown">
                            <thead>
                            <tr>
                                <th>Group cha</th>
                                <th>Group con</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Group cha 1</td>
                                    <td>
                                        <div class="item">
                                            <div class="custom-select-table">
                                                {!!
                                                    Form::select('group[]', [1 => "Group Con 1", "Group Con 2"], null, ['class' => 'table-select group-id', 'placeholder' => "Chọn 1 group"])
                                                !!}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            <div class="form-group">
                <div class="left-side">
                    <label class="label-control">Trạng thái</label>
                </div>
                <div class="right-side">
                    <div class="custom-select">
                         {!! Form::select('setting_status', [1 => "Đang hoạt động", "Tạm ngưng"], null, ['class' => 'form-control', "placeholder" => "Chọn một"]) !!}
                    </div>
                </div>
            </div>
            <div class="group-profile">
                <h4>Service Profile Item</h4>
                {{-- Single Select --}}
                <div class="form-group">
                    <div class="left-side">
                        <label class="label-control">User</label>
                    </div>
                    <div class="right-side">
                        <div class="custom-select">
                            {!! Form::select("tfsf", [1,2,3], null, ['class' => 'single', 'placeholder' =>  "fdfdg", 'id' => "fdg" ]) !!}
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="left-side">
                        <label class="label-control">User</label>
                    </div>
                    <div class="right-side">
                        <div class="birthday-block clearfix">
                           <div class="custom-select w-100 pull-left">
                               {!! Form::selectRange("year", 1990, date('Y'), date('Y'), ['class' => 'w-100 pull-left year single', 'placeholder' => "Year", 'id' => "year"]) !!}
                           </div>
                           <span class="pull-left">Year</span>

                           <div class="custom-select w-100 pull-left monthday">
                               {!! Form::selectRange("year", 1, 12, date('m'), ['class' => 'w-100 pull-left month single', 'placeholder' => "Month", 'id' => "month"]) !!}
                           </div>
                           <span class="pull-left">Month</span>

                           <div class="custom-select w-100 pull-left monthday">
                               {!! Form::selectRange("day", 1, 31, date('d'), ['class' => 'w-100 pull-left day single', 'placeholder' => "Day", 'id' => "day"]) !!}
                           </div>
                           <span class="pull-left">Day</span>
                       </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="left-side">
                        <label class="label-control">User</label>
                    </div>
                    <div class="right-side">
                       {!! Form::text('Txt', null, ['class' => 'form-control custom-datepicker', 'placeholder' => "Datetime...", 'id' => 'datetime']) !!}
                    </div>
                </div>
            </div>
            <div class="btn-search">
                {!! Form::submit( "Search", ["class"=>"btn btn-orange btn-w150"]) !!}
            </div>
            <div class="search-result">
                <h2>Kết quả tìm kiếm</h2>
                <div class="load-content-list-user">
                    <div class="form-group">
                        <span style="font-size:15px;color: #3d4e79"> Kết quả: 1232 records 1-30件表示</span>
                    </div>
                    <div class="form-group">
                        <div class="left-side">
                            <label class="label-control">Sắp xếp</label>
                        </div>
                        <div class="right-side">
                            <div class="custom-select">
                                {!! Form::select('sort_item', [12,34,4], null, ['class' => 'form-control', 'id' => 'sort_item']) !!}
                            </div>
                        </div>
                    </div>
                    <p> <button class="center-block btn btn-orange btn-w150 btn-csv" name="download_csv" value="1">Button bình thường</button></p>
                    <p><a href="#" class="center-block btn btn-orange btn-w150 btn-csv csv-disable link-disabled-csv" disabled='true'>Button Disable</a></p>
                    <div class="content-result-list-user">
                        <nav class="text-center" aria-label="...">
                            <ul class="pagination">
                              <li class="page-item">
                                <a class="page-link">Previous</a>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">1</a></li>
                              <li class="page-item active">
                                <span class="page-link">
                                  2
                                  <span class="sr-only">(current)</span>
                                </span>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">3</a></li>
                              <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                              </li>
                            </ul>
                        </nav>
                        
                        <table class="table table-blue table-list-user">
                            <thead>
                                <tr>
                                    <th style="width: 13%;">ID</th>
                                    <th style="width: 13%;">Tên công ty</th>
                                    <th style="width: 14%;">Ngày tham gia</th>
                                    <th style="width: 14%;">Ngày đại diện</th>
                                    <th style="width: 8%;">Tàu riêng</th>
                                    <th style="width: 10%;">Hóa đơn</th>
                                    <th style="width: 13%;">Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="word-wrap: break-word;">1</td>
                                    <td style="word-wrap: break-word;">Cmaxs</td>
                                    <td style="">cmaxs</td>
                                    <td style="">lorem ispum</td>
                                    <td>keep camlp</td>
                                    <td><span class="span-danger">Reated</span></td>
                                    <td>
                                        <a href="#" class="btn btn-blue-dark btn-custom-sm">Xóa</a>
                                        <a href="#" class="btn btn-blue-dark btn-custom-sm btn-lock">Chi tiết</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <nav class="text-center" aria-label="...">
                            <ul class="pagination">
                              <li class="page-item disabled">
                                <span class="page-link">Previous</span>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">1</a></li>
                              <li class="page-item active">
                                <span class="page-link">
                                  2
                                  <span class="sr-only">(current)</span>
                                </span>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">3</a></li>
                              <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                              </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>
@endsection

@section('javascript')
<script type="text/javascript" src="{{ asset('js/users-general-list-user.js') }}"></script>
@endsection