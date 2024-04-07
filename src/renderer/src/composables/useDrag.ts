class Drag {
  private body?: HTMLBodyElement
  private pageX = 0
  private pageY = 0
  constructor() {}
  public run() {
    window.addEventListener('DOMContentLoaded', () => {
      this.body = document.querySelector('body') as HTMLBodyElement

      this.body.addEventListener('mousedown', this.mouseDown)
    })
  }

  private mouseDown = (e: MouseEvent) => {
    console.log(e.pageX)
    this.pageX = e.pageX
    this.pageY = e.pageY
    this.body?.addEventListener('mousemove', this.mouseMove)
    this.body?.addEventListener('mouseup', () => {
        this.body?.removeEventListener('mousemove', this.mouseMove)
      })
      this.body?.addEventListener('mouseout', () => {
        this.body?.removeEventListener('mousemove', this.mouseMove)
      })
  }

  private mouseMove = (e: MouseEvent) => {
    const x = e.pageX - this.pageX
    const y = e.pageY - this.pageY
    console.log(x, y)
    window.api.mouseMove({ x, y })
  }
}

export default Drag
