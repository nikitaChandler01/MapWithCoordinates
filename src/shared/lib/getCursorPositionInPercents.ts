export const getCursorPositionInPercents = (
 e: React.MouseEvent<HTMLDivElement, MouseEvent>,
 target: HTMLDivElement
) => {
 const rect = target.getBoundingClientRect();
 let x = ((e.clientX - rect.left) / rect.width) * 100;
 let y = ((e.clientY - rect.top) / rect.height) * 100;
 x = Math.max(0, Math.min(100, x));
 y = Math.max(0, Math.min(100, y));
 return {
  x,
  y,
 };
};

