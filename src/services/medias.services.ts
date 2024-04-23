import { config } from 'dotenv'
import { Request } from 'express'
import fs from 'fs'
import sharp from 'sharp'
import { isProduction } from '~/constants/config'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Orther'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
config()

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        sharp.cache(false)
        await sharp(file.filepath)
          .jpeg()
          .toFile(UPLOAD_IMAGE_DIR + '/' + newName + '.jpg')
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = files.map((file) => {
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video-stream/${file.newFilename}`
          : `http://localhost:${process.env.PORT}/static/video-stream/${file.newFilename}`,
        type: MediaType.Video
      }
    })
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
