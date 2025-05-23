<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Get My Approval</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.0/dist/css/uikit.min.css" />

    @viteReactRefresh
    @vite('resources/js/ServicePartner/app.jsx')
    @vite('resources/css/app.css')
</head>

<body>
    <div id="app"></div>
</body>

</html>
