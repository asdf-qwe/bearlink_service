'use client'

import { components } from '@/lib/backend/apiV1/schema'
import client from '@/lib/backend/clinet'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type post = components['schemas']['PostDto']

export default function PostDetail() {
    const params = useParams()
    const router = useRouter()
    const [post, setPost] = useState<post | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await client.GET('/api/v1/posts/{id}', {
                    params: {
                        path: { id: Number(params.id) },
                    },
                })

                if (error) {
                    throw new Error('포스트를 불러오는데 실패했습니다')
                }

                setPost(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다')
            } finally {
                setIsLoading(false)
            }
        }

        fetchPost()
    }, [params.id])

    const handleDelete = async () => {
        if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) return

        try {
            const response = await fetch(`http://localhost:8090/api/v1/posts/${params.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('포스트 삭제에 실패했습니다')
            }

            router.push('/post')
            router.refresh()
        } catch (err) {
            alert(err instanceof Error ? err.message : '포스트 삭제 중 오류가 발생했습니다')
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="text-center text-red-500 py-10">{error}</div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="text-center text-gray-500 py-10">포스트를 찾을 수 없습니다.</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 상단 버튼 영역 */}
                <div className="flex justify-between items-center mb-8">
                    <Link href="/post" className="text-indigo-600 hover:text-indigo-900 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        목록으로
                    </Link>
                    <div className="space-x-2">
                        <Link
                            href={`/post/${params.id}/edit`}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            수정
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            삭제
                        </button>
                    </div>
                </div>

                {/* 포스트 내용 영역 */}
                <article className="bg-white rounded-lg shadow-sm p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">{post.string}</h1>
                        <div className="flex items-center text-gray-500 text-sm">
                            <span className="mr-4">작성자: {post.author}</span>
                            <span>조회수: {Math.floor(Math.random() * 1000)}</span>
                        </div>
                    </header>
                    <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>
                </article>

                {/* 댓글 영역 (추후 구현) */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold mb-4">댓글</h2>
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                        댓글 기능은 준비 중입니다.
                    </div>
                </div>
            </div>
        </div>
    )
}
