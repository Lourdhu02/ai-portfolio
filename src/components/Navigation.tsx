'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { usePageTransition } from '@/components/transition-provider'
import { pageEase } from '@/lib/motion'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const MotionLink = motion.create(Link)

export function Navigation() {
  const pathname = usePathname()
  const { navigate } = usePageTransition()
  const reduceMotion = useReducedMotion() ?? false
  const [menuOpen, setMenuOpen] = useState(false)
  const navShellRef = useRef<HTMLElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const menuGlowRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)
  const restoreFocusAfterCloseRef = useRef(true)
  const prevPathRef = useRef(pathname)

  const restoreFocus = useCallback(() => {
    const previous = prevFocusRef.current
    if (previous && document.contains(previous)) {
      previous.focus()
    } else {
      toggleRef.current?.focus()
    }
    prevFocusRef.current = null
  }, [])

  const closeMenu = useCallback((restoreFocusAfterClose = true) => {
    restoreFocusAfterCloseRef.current = restoreFocusAfterClose
    setMenuOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement
    restoreFocusAfterCloseRef.current = true
    setMenuOpen(true)
  }, [])

  const handleNav = useCallback(
    (href: string) => {
      closeMenu(false)
      navigate(href)
    },
    [closeMenu, navigate]
  )

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      closeMenu(true)
    }
  }, [closeMenu, pathname])

  useEffect(() => {
    if (!menuOpen) return

    const shell = navShellRef.current
    const panel = menuPanelRef.current
    const glow = menuGlowRef.current

    if (!panel) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>('[data-menu-focusable]'))
    const firstLink = panel.querySelector<HTMLElement>('[data-nav-link]') ?? focusables()[0]
    const focusTimeout = window.setTimeout(() => firstLink?.focus(), reduceMotion ? 0 : 120)

    const ctx = gsap.context(() => {
      if (shell) {
        gsap.fromTo(
          shell,
          { y: -14, opacity: 0.6, scale: 0.985 },
          { y: 0, opacity: 1, scale: 1, duration: reduceMotion ? 0 : 0.35, ease: 'power3.out' }
        )
      }

      if (panel) {
        gsap.fromTo(
          panel,
          { y: 18, opacity: 0, scale: 0.985 },
          { y: 0, opacity: 1, scale: 1, duration: reduceMotion ? 0 : 0.45, ease: 'power3.out' }
        )
      }

      if (glow) {
        gsap.fromTo(
          glow,
          { opacity: 0, scale: 0.85, x: -24, y: -18 },
          { opacity: 1, scale: 1, x: 0, y: 0, duration: reduceMotion ? 0 : 0.5, ease: 'power2.out' }
        )

        if (!reduceMotion) {
          gsap.to(glow, {
            x: 18,
            y: 12,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      }
    }, navShellRef)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (!items.length) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.clearTimeout(focusTimeout)
      document.removeEventListener('keydown', handleKeyDown)
      ctx.revert()
    }
  }, [closeMenu, menuOpen, reduceMotion])

  const linkItemVariants = {
    initial: { opacity: 0, x: -12 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.24, ease: pageEase },
    },
  }

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.18,
        ease: pageEase,
        when: 'beforeChildren',
        staggerChildren: reduceMotion ? 0 : 0.05,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: reduceMotion ? 0 : 0.18, ease: pageEase },
    },
  }

  const pillVariants = {
    closed: { rotate: 0, y: 0, opacity: 1 },
    open: { rotate: 0, y: 0, opacity: 1 },
  }

  const lineTop = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 5.5 },
  }

  const lineMiddle = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0 },
  }

  const lineBottom = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -5.5 },
  }

  return (
    <>
      <motion.nav
        ref={navShellRef}
        className="fixed left-0 right-0 top-0 z-[60] pointer-events-none"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: pageEase }}
        aria-label="Main navigation"
      >
          <div className="mx-4 mt-3 sm:mx-6 md:mx-10 lg:mx-16 h-16 rounded-[28px] border border-white/15 bg-white/[0.06] shadow-[0_14px_36px_rgba(10,10,14,0.06)] backdrop-blur-2xl backdrop-saturate-150 pointer-events-auto relative overflow-hidden">
            <svg className="absolute w-0 h-0" aria-hidden="true">
              <defs>
                <filter id="lg-distortion">
                  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="5">
                    <animate attributeName="baseFrequency" values="0.013;0.017;0.013" dur="10s" repeatCount="indefinite" />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>

            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ filter: 'url(#lg-distortion)' }}>
              <div className="absolute inset-0 bg-white/[0.03]" />
            </div>

            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 100%)',
                width: '40%',
              }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),rgba(255,255,255,0.06)_45%,transparent_100%)] opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_22%,transparent_78%,rgba(255,255,255,0.04))] opacity-45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_8%_100%,rgba(255,59,48,0.04),transparent_28%)] opacity-45" />

          <div className="relative h-full w-full px-5 md:px-7 flex items-center justify-between">
            <MotionLink
              href="/"
              onClick={(event) => {
                event.preventDefault()
                handleNav('/')
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="font-sans text-lg font-semibold tracking-tight text-text relative"
              aria-label="Home"
            >
              LR
              <motion.span
                className="absolute inset-x-0 -bottom-0.5 h-px bg-current origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </MotionLink>

            <button
              ref={toggleRef}
              onClick={() => (menuOpen ? closeMenu(true) : openMenu())}
              className="relative grid h-11 w-11 place-items-center rounded-[18px] border border-white/16 bg-white/[0.03] text-text shadow-[0_8px_18px_rgba(10,10,14,0.05)] backdrop-blur-xl transition-colors duration-150 hover:bg-white/[0.08]"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="navigation-menu"
            >
              <motion.span
                className="absolute inset-0 rounded-[18px] bg-white/20"
                initial={false}
                animate={menuOpen ? 'open' : 'closed'}
                variants={pillVariants}
              />
              <span className="relative flex h-4 w-4 flex-col items-stretch justify-center gap-1.5">
                <motion.span
                  className="h-[1.5px] w-full rounded-full bg-current origin-center"
                  initial={false}
                  animate={menuOpen ? 'open' : 'closed'}
                  variants={lineTop}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: pageEase }}
                />
                <motion.span
                  className="h-[1.5px] w-full rounded-full bg-current origin-center"
                  initial={false}
                  animate={menuOpen ? 'open' : 'closed'}
                  variants={lineMiddle}
                  transition={{ duration: reduceMotion ? 0 : 0.18, ease: pageEase }}
                />
                <motion.span
                  className="h-[1.5px] w-full rounded-full bg-current origin-center"
                  initial={false}
                  animate={menuOpen ? 'open' : 'closed'}
                  variants={lineBottom}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: pageEase }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence
        onExitComplete={() => {
          if (restoreFocusAfterCloseRef.current) {
            restoreFocus()
          }
          restoreFocusAfterCloseRef.current = true
        }}
      >
        {menuOpen && (
          <motion.div
            id="navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-50 overflow-hidden bg-[rgba(10,10,14,0.55)] backdrop-blur-3xl"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,59,48,0.04),transparent_35%)]" />
            <div
              ref={menuGlowRef}
              className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_45%,transparent_75%)] blur-3xl"
            />

            <motion.div
              ref={menuPanelRef}
              className="relative flex min-h-full w-full flex-col justify-between px-6 sm:px-8 md:px-16 lg:px-24 pt-28 pb-14"
              initial={false}
            >
              <div className="max-w-4xl">
                <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-8">
                  Navigation
                </p>

                <div className="flex flex-col gap-6 md:gap-8">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <MotionLink
                        key={item.href}
                        href={item.href}
                        data-menu-focusable
                        data-nav-link
                        aria-current={isActive ? 'page' : undefined}
                        variants={linkItemVariants}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={(event) => {
                          event.preventDefault()
                          handleNav(item.href)
                        }}
                        className="relative inline-flex items-center gap-5 text-left"
                      >
                        <span className="font-mono text-xs text-white/45 tabular-nums w-6 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-sans text-4xl md:text-5xl tracking-tight leading-none ${
                            isActive ? 'text-accent' : 'text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-underline"
                            className="absolute left-11 -bottom-1 h-[2px] w-[calc(100%-2.75rem)] bg-accent origin-left"
                          />
                        )}
                      </MotionLink>
                    )
                  })}
                </div>

                <div className="mt-10 flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a
                      href="https://linkedin.com/in/lourdhu"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-menu-focusable
                      className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1.5 group"
                    >
                      <span className="relative">
                        LinkedIn
                        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        →
                      </motion.span>
                    </a>
                    <a
                      href="https://github.com/Lourdhu02"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-menu-focusable
                      className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1.5 group"
                    >
                      <span className="relative">
                        GitHub
                        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        →
                      </motion.span>
                    </a>
                    <a
                      href="https://kaggle.com/blourdhuraju"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-menu-focusable
                      className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1.5 group"
                    >
                      <span className="relative">
                        Kaggle
                        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </div>

                  <a
                    href="mailto:b.lourdhuraju1234@gmail.com"
                    data-menu-focusable
                    className="text-sm text-white/80 hover:text-white transition-colors duration-150 break-words"
                  >
                    b.lourdhuraju1234@gmail.com
                  </a>

                  <div className="flex items-center gap-2 text-white/50">
                    <svg width="6" height="6" viewBox="0 0 6 6" className="status-dot-svg">
                      <circle cx="3" cy="3" r="3" fill="#22c55e" />
                    </svg>
                    <span className="font-mono text-xs">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
