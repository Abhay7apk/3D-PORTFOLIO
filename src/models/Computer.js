import React, { useEffect, useState, useRef } from "react";

import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

const defaultConfig = {
  mass: 5,
  tension: 400,
  friction: 150,
  precision: 0.0001,
};

function OverlayContent() {
  return (
    <>
      <h1 className="title">Projects</h1>
      <div className="tile-grid">
        <div className="tile">
          <div className="tile-content">
            FREQUENNCI <br />
            <span className="description">
              A Music landing page witth animated transition 
              while scrolling with player. (React | Framer Motion |Javascript)
            </span>
          </div>
          <div className="tile-bottom">
            <a href="https://abhay7apk.github.io/Frequnnci/" target="new">
              Live Page
            </a>
            <a href="https://github.com/Abhay7apk/Frequnnci" target="new">
              Source
            </a>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            COVITER <br />
            <span className="description">
              COVITER Is the site that analyzes and track covid 
              records. (React)
            </span>
          </div>
          <div className="tile-bottom">
          <a href="https://github.com/Abhay7apk/coviter" target="new">
              Source
            </a>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            SNAKEX <br />
            <span className="description">
              A classic snake game made by reversing a linked list. (React | linked list| Graph)
            </span>
          </div>
          <div className="tile-bottom">
            <a href="https://abhay7apk.github.io/Snakex/" target="new">
              Live Page
            </a>
            <a href="https://github.com/Abhay7apk/Snakex" target="new">
              Source
            </a>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            Blog Site! <br />
            <span className="description">
              A blogging site to put blog and projects with social link. (HTML5 AND JAVASCRIPT | CSS)
            </span>
          </div>
          <div className="tile-bottom">
            <a href="https://abhay7apk.github.io/respoblog/" target="new">
              Live Page
            </a>
            <a href="https://github.com/Abhay7apk/respoblog" target="new">
              Source
            </a>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            PARALLAX SITE <br />
            <span className="description">
              A parallax scrolling site made with fun with 
              satisfying transition from a tutorial while learning (JAVASCRIPT)
            </span>
          </div>
          <div className="tile-bottom">
          <a href="https://github.com/Abhay7apk/PARALLAX" target="new">
              Source
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function Computer({ materials, nodes, setItems }) {
  const [label, setLabel] = useState(false);
  const [active, setActive] = useState(false);
  const allowAnimation = useRef(false);

  const sProps = useSpring({
    rot: active ? [0, 0, 0] : [0, 0, -1.8],
    config: defaultConfig,
  });

  const ani = useSpring({
    rot2: label ? [0, 0, -0.2] : [0, 0, 0],
    config: {
      mass: 0.1,
      tension: 50,
      friction: 10,
      precision: 0.0001,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
      allowAnimation.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    document.body.style.cursor = label ? "pointer" : "auto";
  }, [label]);

  return (
    <group>
      <group
        onPointerEnter={() => {
          if (allowAnimation.current) setLabel(true);
        }}
        onPointerLeave={() => {
          if (allowAnimation.current) setLabel(false);
        }}
        onClick={() => {
          if (allowAnimation.current) setItems(<OverlayContent />);
        }}
      >
        <mesh
          material={materials.Default_White}
          geometry={nodes.Computer_1.geometry}
        />
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Computer_2.geometry}
        />
        <mesh
          material={materials.Default_White}
          geometry={nodes.Cube.geometry}
        />
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Cube_1.geometry}
        />
        <a.group position={[-0.713, 0.545, -0.14]} rotation={sProps.rot}>
          <a.mesh
            material={materials.Default_White}
            geometry={nodes.Lid_1.geometry}
            rotation={ani.rot2}
          />
          <a.mesh
            material={materials.Default_Color}
            geometry={nodes.Lid_2.geometry}
            rotation={ani.rot2}
          />
        </a.group>
        <mesh material={nodes.Hinge.material} geometry={nodes.Hinge.geometry} />
      </group>

      <group visible={label}>
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Laptop_Label_1.geometry}
        />
        <mesh
          material={materials.Default_White}
          geometry={nodes.Laptop_Label_2.geometry}
        />
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Laptop_Text.geometry}
          position={[-0.64, 0.73, -0.19]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <mesh
            material={materials.Default_Color}
            geometry={nodes.Laptop_CTV.geometry}
            position={[0.01, 0, 0.04]}
          />
        </mesh>
      </group>
    </group>
  );
}
