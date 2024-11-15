import { memo } from 'react';
// @mui
import { Box, BoxProps, useTheme } from '@mui/material';
//
// ----------------------------------------------------------------------

function ChessNewsIcon({ ...other }: BoxProps) {
  //
  const { palette } = useTheme();

  return (
    <Box {...other}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_207_75)">
          <path
            d="M9.2786 24.0383C10.5351 24.0373 11.7736 23.7403 12.894 23.1716C14.0144 22.6029 14.9851 21.7784 15.7276 20.7648H17.3142C17.4038 20.7648 17.4898 20.7292 17.5532 20.6658C17.6166 20.6024 17.6522 20.5164 17.6522 20.4268C17.6522 20.3372 17.6166 20.2512 17.5532 20.1878C17.4898 20.1244 17.4038 20.0888 17.3142 20.0888H13.3238C13.2822 20.0883 13.2425 20.0716 13.213 20.0423C13.1836 20.0129 13.1667 19.9732 13.1661 19.9316V19.6513C13.1667 19.6097 13.1835 19.57 13.213 19.5405C13.2424 19.5111 13.2822 19.4943 13.3238 19.4936H22.8796C22.9211 19.4943 22.9607 19.511 22.99 19.5404C23.0194 19.5697 23.0362 19.6093 23.0368 19.6508V19.9311C23.0362 19.9726 23.0194 20.0123 22.99 20.0416C22.9607 20.071 22.9211 20.0877 22.8796 20.0883H18.8892C18.7995 20.0883 18.7136 20.124 18.6502 20.1873C18.5868 20.2507 18.5512 20.3367 18.5512 20.4263C18.5512 20.516 18.5868 20.6019 18.6502 20.6653C18.7136 20.7287 18.7995 20.7643 18.8892 20.7643H22.8796C23.1006 20.7641 23.3125 20.6761 23.4688 20.5199C23.625 20.3636 23.713 20.1517 23.7132 19.9307V19.6504C23.713 19.4293 23.625 19.2175 23.4688 19.0612C23.3125 18.9049 23.1006 18.817 22.8796 18.8167H22.8469C22.6382 18.6915 22.4577 18.5243 22.317 18.3256C22.1763 18.127 22.0785 17.9013 22.0296 17.6629C21.9891 17.4333 21.8986 17.2154 21.7644 17.0248C21.6302 16.8342 21.4556 16.6755 21.2531 16.56C21.3109 16.445 21.341 16.318 21.3411 16.1893V15.909C21.3408 15.7955 21.3173 15.6832 21.2721 15.579C21.227 15.4748 21.1611 15.3809 21.0784 15.3031C20.9958 15.2252 20.8981 15.165 20.7915 15.1261C20.6848 15.0872 20.5713 15.0704 20.4579 15.0768C20.2192 14.4509 20.0126 13.8132 19.8387 13.1662C19.8165 13.0794 19.7607 13.0049 19.6836 12.9592C19.6066 12.9135 19.5145 12.9003 19.4276 12.9225C19.3408 12.9447 19.2663 13.0004 19.2206 13.0775C19.1749 13.1546 19.1617 13.2467 19.1839 13.3335C19.3397 13.9238 19.5259 14.5057 19.7416 15.0768H16.4637C17.2111 13.1873 17.5362 11.1572 17.4161 9.12873H18.7882C18.7345 9.99166 18.763 10.8577 18.8733 11.7153C18.879 11.7593 18.8933 11.8018 18.9154 11.8403C18.9375 11.8788 18.967 11.9126 19.0021 11.9397C19.0373 11.9668 19.0774 11.9868 19.1203 11.9984C19.1632 12.01 19.2079 12.013 19.2519 12.0073C19.296 12.0017 19.3384 11.9874 19.377 11.9653C19.4155 11.9432 19.4492 11.9137 19.4764 11.8785C19.5035 11.8434 19.5234 11.8032 19.535 11.7604C19.5466 11.7175 19.5497 11.6728 19.544 11.6287C19.4368 10.7951 19.4111 9.95296 19.4671 9.11431C19.7797 9.0689 20.0676 8.91836 20.2833 8.68748C20.499 8.4566 20.6296 8.15915 20.6536 7.84412C20.8453 7.80942 21.0189 7.70868 21.1441 7.55939C21.2694 7.41009 21.3384 7.22167 21.3392 7.02681V6.74652C21.3388 6.54694 21.267 6.3541 21.1366 6.20299C21.0062 6.05188 20.826 5.95253 20.6286 5.92296C20.6861 5.79172 20.7517 5.66422 20.8252 5.54123C20.9738 5.29101 21.0534 5.0059 21.056 4.71492C21.0585 4.42394 20.984 4.13746 20.8399 3.88466C20.6958 3.63185 20.4872 3.42174 20.2356 3.2757C19.9839 3.12966 19.698 3.05291 19.407 3.05325H18.4387V2.64075H19.1041C19.1937 2.64075 19.2797 2.60514 19.3431 2.54176C19.4065 2.47838 19.4421 2.39241 19.4421 2.30277C19.4421 2.21313 19.4065 2.12717 19.3431 2.06378C19.2797 2.0004 19.1937 1.96479 19.1041 1.96479H18.4387V1.29796C18.4387 1.20871 18.4032 1.12311 18.3401 1.06C18.277 0.996882 18.1914 0.961426 18.1022 0.961426C18.0129 0.961426 17.9273 0.996882 17.8642 1.06C17.8011 1.12311 17.7656 1.20871 17.7656 1.29796V1.96479H17.0993C17.0096 1.96479 16.9237 2.0004 16.8603 2.06378C16.7969 2.12717 16.7613 2.21313 16.7613 2.30277C16.7613 2.39241 16.7969 2.47838 16.8603 2.54176C16.9237 2.60514 17.0096 2.64075 17.0993 2.64075H17.7656V3.05133H16.7969C16.5059 3.05098 16.22 3.12774 15.9683 3.27378C15.7166 3.41982 15.5081 3.62993 15.364 3.88274C15.2199 4.13554 15.1453 4.42201 15.1479 4.713C15.1504 5.00398 15.23 5.28909 15.3786 5.53931C15.4521 5.66231 15.5178 5.7898 15.5752 5.92104C15.3779 5.9506 15.1976 6.04996 15.0672 6.20106C14.9369 6.35217 14.865 6.54502 14.8647 6.7446V7.02489C14.8656 7.21979 14.9347 7.40822 15.06 7.5575C15.1853 7.70679 15.3589 7.80751 15.5507 7.8422C15.5747 8.15723 15.7054 8.45468 15.921 8.68556C16.1367 8.91644 16.4246 9.06698 16.7373 9.11239C16.8151 10.2825 16.7343 11.4577 16.4969 12.6061C15.8816 11.3159 14.9316 10.2142 13.7459 9.41601C12.5601 8.61777 11.1819 8.15216 9.75498 8.0677C8.32805 7.98324 6.90458 8.28301 5.63291 8.93578C4.36123 9.58854 3.2879 10.5704 2.52475 11.7791C1.76161 12.9877 1.33658 14.379 1.29396 15.8078C1.25134 17.2365 1.59269 18.6506 2.28244 19.9026C2.97219 21.1546 3.98509 22.1987 5.2156 22.9261C6.4461 23.6535 7.84917 24.0376 9.2786 24.0383ZM16.7969 3.72729H19.4074C19.5788 3.72707 19.7472 3.77221 19.8955 3.85812C20.0438 3.94403 20.1667 4.06766 20.2518 4.21644C20.3368 4.36522 20.381 4.53386 20.3798 4.70524C20.3786 4.87661 20.3321 5.04462 20.2449 5.1922C20.1084 5.41911 19.9957 5.65948 19.9084 5.9095H16.2969C16.2096 5.65948 16.0969 5.4191 15.9603 5.1922C15.8732 5.04469 15.8267 4.87677 15.8255 4.70548C15.8242 4.53418 15.8683 4.36561 15.9533 4.21686C16.0382 4.0681 16.161 3.94447 16.3092 3.85849C16.4573 3.77251 16.6256 3.72724 16.7969 3.72729ZM15.6983 7.1821C15.6566 7.1816 15.6168 7.16483 15.5874 7.13536C15.5579 7.10589 15.5411 7.06607 15.5406 7.02441V6.74412C15.5411 6.70245 15.5579 6.66263 15.5874 6.63316C15.6168 6.6037 15.6566 6.58692 15.6983 6.58643H20.506C20.5476 6.58705 20.5873 6.60388 20.6166 6.63333C20.646 6.66278 20.6627 6.70253 20.6632 6.74412V7.02441C20.6627 7.06599 20.646 7.10574 20.6166 7.13519C20.5873 7.16465 20.5476 7.18148 20.506 7.1821H15.6983ZM16.232 7.85806H19.9724C19.9443 8.02415 19.8584 8.17497 19.7299 8.28382C19.6013 8.39266 19.4384 8.45251 19.2699 8.45277H16.9348C16.7664 8.45251 16.6035 8.39266 16.4749 8.28382C16.3464 8.17497 16.26 8.02415 16.232 7.85806ZM13.3252 20.7648H14.8685C13.981 21.8143 12.8163 22.5933 11.5074 23.0129C12.1429 22.3401 12.6354 21.5456 12.9555 20.6773C13.0703 20.7347 13.1969 20.7647 13.3252 20.7648ZM13.5272 18.6936C13.6741 17.9327 13.7561 17.1607 13.7724 16.3859H14.8882C14.9032 16.4471 14.9248 16.5064 14.9526 16.5629C13.8675 17.185 14.531 17.8932 13.5272 18.6936ZM21.3637 17.7802C21.4321 18.161 21.5977 18.5177 21.8445 18.8158H14.3608C14.6071 18.5174 14.7726 18.1608 14.8416 17.7802C14.8804 17.5666 14.9932 17.3735 15.1603 17.235C15.3274 17.0964 15.538 17.0211 15.755 17.0225H20.4464C20.6635 17.0211 20.874 17.0964 21.0411 17.235C21.2082 17.3735 21.3211 17.5666 21.3599 17.7802H21.3637ZM20.506 15.7528C20.5476 15.7534 20.5873 15.7702 20.6166 15.7997C20.646 15.8291 20.6627 15.8689 20.6632 15.9105V16.1908C20.6621 16.2319 20.6451 16.2711 20.6158 16.3C20.5865 16.3289 20.5472 16.3454 20.506 16.346H15.6983C15.6566 16.3455 15.6168 16.3288 15.5874 16.2993C15.5579 16.2698 15.5411 16.23 15.5406 16.1883V15.9081C15.5411 15.8664 15.5579 15.8266 15.5874 15.7971C15.6168 15.7676 15.6566 15.7509 15.6983 15.7504L20.506 15.7528ZM15.03 11.5182C15.547 12.177 15.9472 12.9197 16.2132 13.7138C16.1041 14.0734 16.0781 14.1379 15.7469 15.0768C15.553 15.0665 15.3615 15.124 15.2053 15.2393C15.0491 15.3546 14.9379 15.5207 14.8906 15.709H13.7719C13.7518 14.6206 13.5981 13.5388 13.3142 12.4879C13.9166 12.2212 14.4911 11.8958 15.0296 11.5162L15.03 11.5182ZM14.5858 11.0037C14.1211 11.3262 13.6281 11.6057 13.1127 11.8388C12.7844 10.8086 12.2323 9.86376 11.4959 9.072C12.673 9.44359 13.7362 10.1083 14.5858 11.0037ZM9.61658 8.76143C11.0517 9.0095 12.0132 10.7109 12.4863 12.0951C11.5652 12.4317 10.5967 12.6203 9.61658 12.6537V8.76143ZM9.61658 13.3287C10.6634 13.2956 11.6984 13.0975 12.6834 12.7417C12.9379 13.7105 13.0764 14.7061 13.0959 15.7076H9.61658V13.3287ZM9.61658 16.384H13.0959C13.077 17.278 12.9642 18.1675 12.7594 19.0379C12.6767 19.1149 12.6099 19.2073 12.5627 19.31C11.6139 18.9803 10.6206 18.7964 9.61658 18.7643V16.385V16.384ZM9.61658 19.4398C10.5961 19.4737 11.5641 19.6627 12.4844 19.9999C11.8392 21.8922 10.7661 23.1273 9.61658 23.3316V19.4398ZM3.53485 20.571C2.5881 19.3742 2.04151 17.91 1.97235 16.3855H4.78485C4.80493 17.4739 4.95864 18.5557 5.24254 19.6066C4.6431 19.8714 4.07112 20.1944 3.53485 20.571ZM3.98004 21.085C4.44233 20.7648 4.93263 20.4871 5.44495 20.2552C5.77273 21.2831 6.32314 22.2262 7.05697 23.0172C5.88502 22.6416 4.82651 21.9769 3.97908 21.0845L3.98004 21.085ZM8.94158 23.3331C7.50648 23.085 6.54495 21.3835 6.07187 19.9994C6.99293 19.6628 7.96151 19.4742 8.94158 19.4408V23.3331ZM8.94158 18.7658C7.8948 18.7989 6.8598 18.997 5.87475 19.3528C5.62026 18.384 5.48179 17.3884 5.46225 16.3869H8.94158V18.7658ZM8.94158 15.7109H5.46129C5.48079 14.7093 5.61926 13.7135 5.87379 12.7446C6.85883 13.1003 7.89383 13.2984 8.94062 13.3316V15.7105L8.94158 15.7109ZM8.94158 8.76335V12.6576C7.96151 12.6241 6.99293 12.4355 6.07187 12.0989C6.5435 10.7114 7.50504 9.0095 8.94062 8.76143L8.94158 8.76335ZM7.05745 9.07921C6.32366 9.87006 5.77326 10.8129 5.44543 11.8408C4.93256 11.6085 4.44177 11.3303 3.97908 11.0095C4.82632 10.1174 5.88447 9.45295 7.056 9.07729L7.05745 9.07921ZM3.53485 11.5234C4.07134 11.9009 4.64364 12.2248 5.2435 12.4903C4.95959 13.5412 4.80587 14.623 4.78581 15.7114H1.97139C2.04051 14.1869 2.58711 12.7227 3.53389 11.5258L3.53485 11.5234Z"
            fill={palette.text.secondary}
          />
        </g>
        <defs>
          <clipPath id="clip0_207_75">
            <rect
              width="22.4255"
              height="23.0769"
              fill={palette.background.default}
              transform="translate(1.28723 0.961426)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(ChessNewsIcon);