'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { zSchema } from '@/lib/zodSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import { showToast } from '@/lib/showToast'
import axios from 'axios'
import useFetch from '@/hooks/useFetch'
import MediaModal from '@/components/Application/Admin/MediaModal'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
    { href: '', label: 'Edit Category' },
]


const EditCategory = () => {

    const params = useParams<{ id: string }>()
    const { data: categoryData } = useFetch(`/api/category/get/${params.id}`)

    const [loading, setLoading] = useState(false)
    // media modal states
    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([])
    const formSchema = zSchema.pick({
        _id: true, name: true, slug: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: params.id,
            name: "",
            slug: "",
        },
    })
 


    useEffect(() => {
        if (categoryData && categoryData.success) {
            const data = categoryData.data
            form.reset({
                _id: data?._id,
                name: data?.name,
                slug: data?.slug
            })
            // preload media selection if exists
            if (data?.media && data.media._id) {
                setSelectedMedia([{ _id: data.media._id, url: data.media.secure_url }])
            }
        }
    }, [categoryData, form])


    const watchedName = form.watch('name')
    useEffect(() => {
        const name = form.getValues('name')
        if (name) {
            form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [watchedName, form])

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            // attach media if selected
            if (selectedMedia.length > 0) {
                values.media = selectedMedia[0]._id
            } else {
                // explicitly send null to clear
                values.media = null
            }

            const { data: response } = await axios.put('/api/category/update', values)
            if (!response.success) {
                throw new Error(response.message)
            }

            showToast('success', response.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />

            <Card className="py-0 rounded shadow-sm">
                <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                    <h4 className='text-xl font-semibold'>Edit Category</h4>
                </CardHeader>
                <CardContent className="pb-5">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >

                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter category name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='border border-dashed rounded p-5 text-center mb-5'>
                                <MediaModal
                                    open={open}
                                    setOpen={setOpen}
                                    selectedMedia={selectedMedia}
                                    setSelectedMedia={setSelectedMedia}
                                    isMultiple={false}
                                />

                                {selectedMedia.length > 0 && (
                                    <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>
                                        <div className='h-24 w-24 border'>
                                            <Image
                                                src={selectedMedia[0].url}
                                                height={100}
                                                width={100}
                                                alt=''
                                                className='size-full object-cover'
                                            />
                                        </div>
                                    </div>
                                )}

                                <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                                    <span className='font-semibold'>Select Image</span>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <ButtonLoading loading={loading} type="submit" text="Update Category" className="cursor-pointer" />
                            </div>

                        </form>
                    </Form>

                </CardContent>
            </Card>

        </div>
    )
}

export default EditCategory