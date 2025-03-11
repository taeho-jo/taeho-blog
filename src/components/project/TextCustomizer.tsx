'use client'

import { useState } from 'react'

const TextCustomizer = () => {
  const [text, setText] = useState('기본 텍스트입니다.')
  const [color, setColor] = useState('#ffffff')

  return (
    <div className="space-y-4">
      {/* 미리보기 텍스트 */}
      <p
        className="text-xl font-semibold"
        style={{ color }}>
        {text}
      </p>

      {/* 텍스트 입력 */}
      <input
        type="text"
        placeholder="텍스트를 입력하세요"
        className="rounded-md border px-3 py-2 text-black"
        onChange={e => setText(e.target.value)}
      />

      {/* 색상 선택 */}
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        className="h-10 w-10 rounded-md border p-1"
      />
    </div>
  )
}

export default TextCustomizer
