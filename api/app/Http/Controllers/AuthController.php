<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
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

    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {
            // Attempt authenticate credentials
            $email = $request->get('username');
            $password = $request->get('password');
            if (!Auth::attempt(compact('email', 'password'))) {
                return response()->json(['message' => 'Email or password wrong'], Response::HTTP_UNAUTHORIZED);
            }

            $user = $this->userRepository->findByEmail($email);
            if (!Hash::check($password, $user->password)) {
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

    /**
     * @param Request $request
     * @return UserResource
     */
    public function me(Request $request) {
        $user = $request->user();
        //$user->load('permissions', 'avatar');
        return new UserResource($user);
    }
}
