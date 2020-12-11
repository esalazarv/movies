<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function login(LoginRequest $request)
    {
        try {
            // Attempt authenticate credentials
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json(['message' => 'Email or password wrong'], Response::HTTP_UNAUTHORIZED);
            }

            $user = $this->userRepository->findByEmail($request->get('email'));
            if (!Hash::check($request->password, $user->password)) {
                throw new \Exception('Username or password wrong');
            }
            $accessToken = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                'access_token' => $accessToken,
                'token_type' => 'Bearer',
            ]);
        } catch (\Throwable $exception) {
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
