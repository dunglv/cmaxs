@extends('layouts.login')

@section('title',__('auth.head_service_login'))

@section('style')
    <link rel="stylesheet" href="{{asset("/css/auth.css")}}">
@endsection

@section('content')
    <div class="service-login">
        <div class="display-error"></div> 
        {{ Form::open(['route' => 'login', 'novalidate' => 'novalidate', 'id' => 'form-login']) }}
        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
            {{ Form::label('text', "UserName") }}
            {{ Form::text('email',null,['class' => 'form-control', 'id' => 'login_id', 'maxlength' => '64']) }}
            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif
        </div>
        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
            {{ Form::label('password', "Password") }}
            {{ Form::password('password',['class' => 'form-control', 'id' => 'password']) }}
            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
        <button type="submit" id="btn-login" class="center-block btn btn-blue-dark btn-w190">Login</button>
        {{ Form::close() }}
    </div>
@endsection

@section('javascript')
    <script type="text/javascript" src="{{ asset('js/auth-service.js') }}"></script>
@endsection