import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  emailVerifyController,
  resendVerifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordTokenController,
  resetPasswordController,
  getMeController,
  updateMeController,
  getProfileController,
  followController,
  unfollowController,
  changePasswordController,
  oauthController,
  refreshTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  forgotPasswordValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyForgotPasswordTokenValidator,
  resetPasswordValidator,
  verifiedUserValidator,
  updateMeValidator,
  followValidator,
  unfollowValidator,
  changePasswordValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

// [POST] login
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

// [GET] login google oauth 2.0
usersRouter.get('/oauth/google', wrapRequestHandler(oauthController))

// [POST] register
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

// [POST] logout
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

// [POST] refresh token
usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

// [POST] verify email
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))

// [POST] resend verify email
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

// [POST] forgot password
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

// [POST] verify forgot password
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordTokenController)
)

// [POST] reset password
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

// [GET] get me
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

// [PATCH] update me
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)

// [GET] get user info
usersRouter.get('/:username', wrapRequestHandler(getProfileController))

// [POST] follow
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

// [DELETE] unfollow
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

// [PUT] change password
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default usersRouter
