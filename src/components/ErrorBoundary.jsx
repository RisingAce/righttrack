import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('UI crashed', error, info)
  }

  handleReset = () => {
    this.setState({ error: null })
    if (typeof this.props.onReset === 'function') {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            padding: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at 20% 20%, rgba(99,166,255,0.12), transparent 25%),' +
              'radial-gradient(circle at 80% 10%, rgba(118,227,193,0.18), transparent 30%),' +
              'linear-gradient(180deg, #050814 0%, #03060d 45%, #050915 100%)',
            color: 'var(--color-text-primary, #f7fbff)',
          }}
        >
          <div
            style={{
              maxWidth: 520,
              width: '100%',
              padding: 24,
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(17,26,50,0.9)',
              boxShadow: '0 18px 48px rgba(0,0,0,0.45)',
            }}
          >
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                background: 'rgba(248,113,113,0.14)',
                color: 'var(--color-danger, #f87171)',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Something went wrong
            </p>
            <h1
              style={{
                margin: '12px 0 8px',
                fontSize: 24,
                fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              }}
            >
              The view failed to load
            </h1>
            <p style={{ color: 'var(--color-text-secondary, #c2cee2)', marginBottom: 16 }}>
              Please retry. If it keeps happening, try clearing your saved workouts in the profile
              page after reloading.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 12,
                  background:
                    'linear-gradient(135deg, var(--color-accent-primary, #76e3c1), var(--color-accent-secondary, #63a6ff))',
                  color: 'var(--color-bg-primary, #060915)',
                  fontWeight: 700,
                }}
              >
                Reload app
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--color-text-primary, #f7fbff)',
                  background: 'rgba(255,255,255,0.04)',
                  fontWeight: 600,
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
