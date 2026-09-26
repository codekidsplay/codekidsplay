'use client'

import AscultaScratchM1 from './AscultaScratchM1'

/** @deprecated Folosește AscultaScratchM1 cu ordine */
export default function AscultaScratchL1({ accentColor }: { accentColor?: string }) {
  return <AscultaScratchM1 ordine={1} accentColor={accentColor} />
}
