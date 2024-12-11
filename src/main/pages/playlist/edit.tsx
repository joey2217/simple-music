import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  Form,
} from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Link,
  LoaderFunction,
  useLoaderData,
  useNavigate,
} from 'react-router'
import { getPlaylistById, usePlaylists } from '@/main/context/PlaylistContext'
import type { Playlist } from '@/main/types'
import { Input, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const editLikePlaylistLoader: LoaderFunction = async ({ params }) => {
  if (params.id) {
    const data = getPlaylistById(params.id)
    if (data) {
      return data
    }
  }
  throw new Response('Not Found', { status: 404 })
}

const EditPlaylist: React.FC = () => {
  const data = useLoaderData() as Playlist
  const { updatePlaylist } = usePlaylists()
  const navigate = useNavigate()

  const form = useForm<Playlist>({
    defaultValues: data,
  })

  const onSelectCover = () => {
    window.electronAPI
      .showOpenDialog({
        title: '选择封面',
        properties: ['openFile'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif', 'webp'] },
        ],
      })
      .then(({ filePaths }) => {
        if (filePaths.length > 0) {
          form.setValue('cover', `file://${filePaths[0]}`)
        }
      })
  }

  const onSubmit = (values: Playlist) => {
    updatePlaylist(values)
    navigate(`/playlist/${data.id}`, { replace: true })
  }

  return (
    <div className="page">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        编辑歌单信息
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md"
        >
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: '标题必填',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input
                    placeholder="输入歌单标题(40字以内)"
                    maxLength={40}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>封面</FormLabel>
                <FormControl>
                  <img
                    src={field.value}
                    alt="封面"
                    className="w-52 aspect-square rounded cursor-pointer"
                    onClick={onSelectCover}
                  />
                </FormControl>
                <FormDescription>推荐尺寸200x200</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>简介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="输入歌单简介(200字以内)"
                    maxLength={200}
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit">确 定</Button>
            <Button variant="secondary" asChild>
              <Link to={`/playlist/${data.id}`} replace>
                取 消
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditPlaylist
