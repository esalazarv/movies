<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'movie_id' => ['sometimes', 'exists:movies,id'],
            'active' => ['sometimes', 'boolean'],
            'start_at' => ['sometimes', 'date_format:Y-m-d H:i:s']
        ];
    }
}
