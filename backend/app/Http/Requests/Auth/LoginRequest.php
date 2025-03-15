<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseFormRequest;

class LoginRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'O campo de e-mail é obrigatório.',
            'email.email' => 'O e-mail informado não é válido.',
            'password.required' => 'O campo de senha é obrigatório.',
            'password.string' => 'A senha deve ser uma string válida.',
        ];
    }
}

