import { motion } from 'framer-motion'
import styles from './Card.module.css'

export const Card = ({
  children,
  variant = 'default',
  onClick,
  className = '',
  animate = true,
  delay = 0,
  ...props
}) => {
  const classes = [
    styles.card,
    styles[variant],
    onClick && styles.clickable,
    className,
  ].filter(Boolean).join(' ')

  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] },
    whileTap: onClick ? { scale: 0.98 } : undefined,
  } : {}

  return (
    <Component
      className={classes}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export const CardHeader = ({ children, className = '' }) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
)

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`${styles.title} ${className}`}>{children}</h3>
)

export const CardDescription = ({ children, className = '' }) => (
  <p className={`${styles.description} ${className}`}>{children}</p>
)

export const CardContent = ({ children, className = '' }) => (
  <div className={`${styles.content} ${className}`}>{children}</div>
)
