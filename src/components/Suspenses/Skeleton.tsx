import React from 'react';
import styled, { keyframes } from 'styled-components';
import DefferedSuspense from './DefferedSuspense';

const skeletonAnimation = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const SkeletonBox = styled.div<{
  $width?: string;
  $height?: string;
  $aspectRatio?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : '100%')};
  height: ${(props) => (props.$height ? props.$height : '100%')};
  aspect-ratio: ${(props) => (props.$aspectRatio ? props.$aspectRatio : 'none')};
  background: linear-gradient(to right, #e8e8e8 0%, #f5f5f5 50%, #e8e8e8 100%);
  background-size: 200% 100%;
  animation: ${skeletonAnimation} 2.5s linear infinite;
  border-radius: 4px;
  object-fit: cover;
`;

const Skeleton = ({ width, height, aspectRatio, isDeffered }: Props) => {
  if (isDeffered) {
    return (
      <DefferedSuspense>
        <SkeletonBox $width={width} $height={height} $aspectRatio={aspectRatio} />
      </DefferedSuspense>
    );
  }
  return <SkeletonBox $width={width} $height={height} $aspectRatio={aspectRatio} />;
};

export default Skeleton;

interface Props {
  width?: string;
  height?: string;
  aspectRatio?: string;
  isDeffered?: boolean;
}
