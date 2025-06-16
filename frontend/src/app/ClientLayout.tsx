'use client'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import client from '@/lib/backend/clinet'
import { LoginMemberContext, useLoginMember } from '@/stores/auth/loginMember'
import { useEffect } from 'react'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const { loginMember, setLoginMember, setNoLoginMember, isLoginMemberPending, isLogin, logout, logoutAndHome } =
        useLoginMember()

    // 전역관리를 위한 Store 등록 - context api 사용
    const loginMemberContextValue = {
        loginMember,
        setLoginMember,
        isLoginMemberPending,
        isLogin,
        logout,
        logoutAndHome,
    }

    useEffect(() => {
        const fetchLoginMember = async () => {
            const { data, error } = await client.GET('/api/v1/members/me')
            if (error) {
                setNoLoginMember()
            } else {
                setLoginMember(data)
            }
        }
        fetchLoginMember()
    }, [])

    if (isLoginMemberPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl font-bold">로딩중...</div>
            </div>
        )
    }

    return (
        <LoginMemberContext value={loginMemberContextValue}>
            <main className="flex flex-col min-h-screen">
                {/* 헤더 영역 */}
                <Header />
                {children}
                {/* 푸터 영역 */}
                <Footer />
            </main>
        </LoginMemberContext>
    )
}
